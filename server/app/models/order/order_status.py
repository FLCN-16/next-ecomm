from sqlalchemy import types, sql, Column

from ...models import Base
from ...utils.helpers.core import generate_uuid


class OrderStatus(Base):
  __tablename__ = 'order_statuses'

  ID = Column(
    types.String(36),
    primary_key=True,
    default=generate_uuid,
  )

  name = Column(
    types.String(32),
    nullable=False,
  )

  slug = Column(
    types.String(32),
    nullable=False,
    index=True,
  )

  description = Column(
    types.String(128),
    nullable=False,
  )

  created_at = Column(
    types.DateTime(timezone=True),
    nullable=False,
    server_default=sql.func.now(),
  )

  updated_at = Column(
    types.DateTime(timezone=True),
    nullable=False,
    server_default=sql.func.now(),
    onupdate=sql.func.now(),
  )
