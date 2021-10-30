from sqlalchemy import types, sql, Column

from ...models import Base
from ...utils.helpers.core import generate_uuid


class Product(Base):
  __tablename__ = 'products'

  ID = Column(
    types.String(),
    primary_key=True,
    default=generate_uuid()
  )

  name = Column(
    types.String(length=100)
  )

  description = Column(
    types.Text()
  )

  created_at = Column(
    types.DateTime(timezone=True),
    server_default=sql.func.now()
  )

  updated_at = Column(
    types.DateTime(timezone=True),
    onupdate=sql.func.now()
  )
