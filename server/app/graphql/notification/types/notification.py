import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType

from ....models import notification as notification_models


class Notification(SQLAlchemyObjectType):
  class Meta:
    model = notification_models.Notification