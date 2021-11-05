import graphene
from graphene.relay import PageInfo
from graphql.error import GraphQLError
from graphene_sqlalchemy import SQLAlchemyConnectionField


def patch_pagination_args(field: SQLAlchemyConnectionField):
  """Add descriptions to pagination arguments in a connection field.
  By default Graphene's connection fields comes without description for pagination
  arguments. This functions patches those fields to add the descriptions.
  """
  field.args["first"].description = "Return the first n elements from the list."
  field.args["last"].description = "Return the last n elements from the list."
  field.args[
    "before"
  ].description = (
    "Return the elements in the list that come before the specified cursor."
  )
  field.args[
    "after"
  ].description = (
    "Return the elements in the list that come after the specified cursor."
  )

class BaseConnectionField(graphene.ConnectionField):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    patch_pagination_args(self)


class BaseSQLAlchemyConnectionField(SQLAlchemyConnectionField):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    patch_pagination_args(self)