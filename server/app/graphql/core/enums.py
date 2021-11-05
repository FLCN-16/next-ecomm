import graphene

from .utils import str_to_enum
from ...core.units import (
  AreaUnits,
  DistanceUnits,
  MeasurementUnits,
  VolumeUnits,
  WeightUnits,
)


def to_enum(enum_cls, *, type_name=None, **options) -> graphene.Enum:
  """Create a Graphene enum from a class containing a set of options.
  :param enum_cls:
    The class to build the enum from.
  :param type_name:
    The name of the type. Default is the class name + 'Enum'.
  :param options:
    - description:
      Contains the type description (default is the class's docstring)
    - deprecation_reason:
      Contains the deprecation reason.
      The default is enum_cls.__deprecation_reason__ or None.
  :return:
  """

  # note this won't work until
  # https://github.com/graphql-python/graphene/issues/956 is fixed
  deprecation_reason = getattr(enum_cls, "__deprecation_reason__", None)
  if deprecation_reason:
    options.setdefault("deprecation_reason", deprecation_reason)

  type_name = type_name or (enum_cls.__name__ + "Enum")
  enum_data = [(str_to_enum(code.upper()), code) for code, name in enum_cls.CHOICES]
  return graphene.Enum(type_name, enum_data, **options)


# unit enums
MeasurementUnitsEnum = to_enum(MeasurementUnits)
DistanceUnitsEnum = to_enum(DistanceUnits)
AreaUnitsEnum = to_enum(AreaUnits)
VolumeUnitsEnum = to_enum(VolumeUnits)
WeightUnitsEnum = to_enum(WeightUnits)
unit_enums = [DistanceUnitsEnum, AreaUnitsEnum,
              VolumeUnitsEnum, WeightUnitsEnum]
