import graphene

from ..core.fields import BaseSQLAlchemyConnectionField
from .types.notification import Notification


class NotificationQueries(graphene.ObjectType):
  product = graphene.Field(
    Notification,
    description="Look up a notification by ID.",
  )

  products = BaseSQLAlchemyConnectionField(
    Notification,
    description="List of the notifications.",
  )


class NotificationMutations(graphene.ObjectType):
  pass


class NotificationSubscriptions(graphene.ObjectType):
  pass