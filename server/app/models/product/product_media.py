from sqlalchemy import types, sql, Column

from ...models import Base
from ...utils.helpers.core import generate_uuid


class ProductMedia(Base):
  __tablename__ = 'product_media'

  ID = Column(
    types.String(),
    primary_key=True,
    default=generate_uuid()
  )

  name = Column(
    types.String(length=100)
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
