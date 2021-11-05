from sqlalchemy import sql, types, Column

from ...models import Base
from ...utils.helpers.core import generate_uuid


class User(Base):
  __tablename__ = 'users'

  ID = Column(
    types.String(),
    primary_key=True,
    default=generate_uuid()
  )

  first_name = Column(
    types.String(length=50)
  )

  last_name = Column(
    types.String(length=50)
  )

  username = Column(
    types.String(length=50),
    unique=True
  )

  email = Column(
    types.String(length=50),
    unique=True
  )

  password = Column(
    types.String(length=255)
  )

  verified = Column(
    types.Boolean(),
    default=False
  )

  role = Column(
    types.String(length=50),
    sql.ForeignKey('user_roles.ID')
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
