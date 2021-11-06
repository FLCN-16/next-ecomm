from sqlalchemy import sql, types, Column

from ...models import Base
from ...utils.helpers.core import generate_uuid


class UserSession(Base):
  __tablename__ = 'user_session'

  ID = Column(
    types.String(36),
    primary_key=True,
    default=generate_uuid
  )

  user_id = Column(
    types.String(36),
    nullable=False
  )

  token = Column(
    types.String(255),
    nullable=False
  )

  expires = Column(
    types.DateTime,
    nullable=False
  )

  created_at = Column(
    types.DateTime(timezone=True),
    nullable=False,
    server_default=sql.func.now(),
    default=sql.func.now()
  )

  updated_at = Column(
    types.DateTime(timezone=True),
    nullable=False,
    server_default=sql.func.now(),
    onupdate=sql.func.now()
  )
