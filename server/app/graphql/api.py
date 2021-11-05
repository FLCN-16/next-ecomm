from .core.enums import unit_enums
from .core.federation import build_federated_schema
from .product.schema import ProductQueries, ProductMutations
from .notification.schema import NotificationQueries, NotificationMutations, NotificationSubscriptions


class Query(
  ProductQueries,
  NotificationQueries,
):
  pass


class Mutation(
  ProductMutations,
  NotificationMutations,
):
  pass


class Subscription(
  NotificationSubscriptions,
):
  pass


schema = build_federated_schema(
  Query, mutation=Mutation,
  subscription=Subscription, types=unit_enums
)
