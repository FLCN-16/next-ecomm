import binascii
from typing import Union

import graphene
from graphene import ObjectType
from graphql.error import GraphQLError


def from_global_id_or_error(
  id: str, only_type: Union[ObjectType, str] = None, raise_error: bool = False
):
  """Resolve database ID from global ID or raise ValidationError.
  Optionally validate the object type, if `only_type` is provided,
  raise GraphQLError when `raise_error` is set to True.
  """
  try:
    _type, _id = graphene.Node.from_global_id(id)
  except (binascii.Error, UnicodeDecodeError, ValueError):
    raise GraphQLError(f"Couldn't resolve id: {id}.")

  if only_type and str(_type) != str(only_type):
    if not raise_error:
      return _type, None
    raise GraphQLError(f"Must receive a {only_type} id.")
  return _type, _id


def str_to_enum(name):
  """Create an enum value from a string."""
  return name.replace(" ", "_").replace("-", "_").upper()
