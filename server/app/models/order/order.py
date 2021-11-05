from sqlalchemy import types, sql, Column

from ...models import Base
from ...utils.helpers.core import generate_uuid


class Order(Base):
  __tablename__ = 'orders'

  ID = Column(
    types.String(36),
    primary_key=True,
    default=generate_uuid,
  )

  user_id = Column(
    types.String(36),
    nullable=False,
  )

  status = Column(
    types.String(36),
    sql.ForeignKey('order_statuses.slug'),
    index=True,
  )

  extra = Column(
    types.JSON,
    nullable=False,
    default={},
  )

  created_at = Column(
    types.DateTime(timezone=True),
    nullable=False,
    server_default=sql.func.now(),
    server_default=sql.func.now(),
  )

  updated_at = Column(
    types.DateTime(timezone=True),
    nullable=False,
    server_default=sql.func.now(),
    onupdate=sql.func.now(),
  )
