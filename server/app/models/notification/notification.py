from sqlalchemy import types, sql, Column

from ...models import Base
from ...utils.helpers.core import generate_uuid


class Notification(Base):
  __tablename__ = 'notifications'
  __table_args__ = {'extend_existing': True}

  id = Column(
    types.String(36),
    primary_key=True,
    default=generate_uuid
  )

  user_id = Column(
    types.String(36),
    nullable=False
  )

  type = Column(
    types.String(36),
    nullable=False,
    default='default',
    server_default='default',
    index=True,
    unique=False,
  )

  message = Column(
    types.String(255),
    nullable=False
  )

  read = Column(
    types.Boolean,
    nullable=False,
    default=False
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
    onupdate=sql.func.now()
  )