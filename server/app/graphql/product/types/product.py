import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType

from ...core.types import Image
from ....models import product as product_models


class Product(SQLAlchemyObjectType):
  class Meta:
    model = product_models.Product


class ProductImage(graphene.ObjectType):
  id = graphene.ID(required=True, description="The ID of the image.")
  alt = graphene.String(description="The alt text of the image.")
  sort_order = graphene.Int(
    required=False,
    description=(
      "The new relative sorting position of the item (from -inf to +inf). "
      "1 moves the item one position forward, -1 moves the item one position "
      "backward, 0 leaves the item unchanged."
    ),
  )
  url = graphene.String(
    required=True,
    description="The URL of the image.",
    size=graphene.Int(description="Size of the image."),
  )

  class Meta:
    description = "Represents a product image."

  @staticmethod
  def resolve_id(root: product_models.ProductMedia, info):
    return graphene.Node.to_global_id("ProductImage", root.id)

  @staticmethod
  def resolve_url(root: product_models.ProductMedia, info, *, size=None):
    if size:
      url = get_thumbnail(root.image, size, method="thumbnail")
    else:
      url = root.image.url
    return info.context.build_absolute_uri(url)
