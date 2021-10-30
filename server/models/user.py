from sqlalchemy import orm, types, sql
import sqlalchemy

from server.models import Base
from server.utils.helpers import generate_uuid


class User(Base):
  __tablename__ = 'users'

  ID = sqlalchemy.Column(
    types.String(),
    primary_key=True,
    default=generate_uuid()
  )

  first_name = sqlalchemy.Column(
    types.String(length=50)
  )

  last_name = sqlalchemy.Column(
    types.String(length=50)
  )

  username = sqlalchemy.Column(
    types.String(length=50),
    unique=True
  )

  email = sqlalchemy.Column(
    types.String(length=50),
    unique=True
  )

  verified = sqlalchemy.Column(
    types.Boolean(),
    default=False
  )

  password = sqlalchemy.Column(
    types.String(length=255)
  )

  created_at = sqlalchemy.Column(
    types.DateTime(timezone=True),
    server_default=sql.func.now()
  )

  updated_at = sqlalchemy.Column(
    types.DateTime(timezone=True),
    onupdate=sql.func.now()
  )