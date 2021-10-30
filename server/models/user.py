from sqlalchemy import types, sql, Column

from ..models import Base
from ..utils.helpers.core import generate_uuid


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

  verified = Column(
    types.Boolean(),
    default=False
  )

  password = Column(
    types.String(length=255)
  )

  created_at = Column(
    types.DateTime(timezone=True),
    server_default=sql.func.now()
  )

  updated_at = Column(
    types.DateTime(timezone=True),
    onupdate=sql.func.now()
  )