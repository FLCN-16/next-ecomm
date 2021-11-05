import graphene

from ..core.fields import BaseSQLAlchemyConnectionField
from .types.product import Product


class ProductQueries(graphene.ObjectType):
  product = graphene.Field(
    Product,
    ID=graphene.Argument(
      graphene.ID,
      description="ID of the product.",
    ),
    slug=graphene.Argument(
      graphene.String,
      description="Slug of the product."
    ),
    description="Look up a product by ID.",
  )

  products = BaseSQLAlchemyConnectionField(
    Product,
    description="List of the products.",
  )


class ProductMutations(graphene.ObjectType):
  pass