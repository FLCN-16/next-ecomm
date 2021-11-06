from sqlalchemy import types, schema, sql, Column

from ...models import Base
from ...utils.helpers.core import generate_uuid


class OrderItems(Base):
  __tablename__ = 'order_items'

  id = Column(
    types.String(36),
    primary_key=True,
    default=generate_uuid
  )

  order_id = Column(
    types.String(36),
    schema.ForeignKey('order.ID'),
    nullable=False,
    index=True
  )

  product_id = Column(
    types.String(36),
    schema.ForeignKey('product.ID'),
    nullable=False,
    index=True
  )

  quantity = Column(
    types.Integer,
    nullable=False,
    default=1
  )

  price = Column(
    types.Float,
    nullable=False
  )

  total = Column(
    types.Float,
    nullable=False
  )