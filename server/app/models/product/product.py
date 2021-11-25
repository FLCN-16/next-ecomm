from sqlalchemy import types, sql, Column

from ...models import Base
from ...utils.helpers.core import generate_uuid


class Product(Base):
  __tablename__ = 'products'

  ID = Column(
    types.String(),
    primary_key=True,
    default=generate_uuid,
  )

  name = Column(
    types.String(length=100),
    nullable=False,
    unique=True,
  )

  slug = Column(
    types.String(length=100),
    nullable=False,
    unique=True,
    index=True,
    default=sql.func.lower(name),
    onupdate=sql.func.lower(name),
  )

  description = Column(
    types.Text(),
    nullable=False,
  )

  price = Column(
    types.Float(),
    nullable=False,
    default=0.0,
    server_default=sql.expression.text('0.0'),
  )

  quantity = Column(
    types.Integer(),
    nullable=False,
    default=0,
    server_default=sql.expression.text('0'),
  )

  user_id = Column(
    types.String(),
    nullable=False,
    index=True,
  )

  created_at = Column(
    types.DateTime(timezone=True),
    nullable=False,
    server_default=sql.func.now(),
    server_default=sql.func.now()
  )

  updated_at = Column(
    types.DateTime(timezone=True),
    nullable=False,
    server_default=sql.func.now(),
    onupdate=sql.func.now()
  )
