import graphene

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

  products = graphene.List(Product)
