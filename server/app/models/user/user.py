import typing

from sqlalchemy import sql, schema, types, Column
from sqlalchemy_serializer import SerializerMixin

from ...models import Base
from app.utils.helpers.core import generate_uuid
from app.utils.hashing import hash_password, verify_password


class User(Base, SerializerMixin):
  __tablename__ = 'users'

  serialize_only = (
    'ID', 'first_name', 'last_name', 'username',
    'email', 'role', 'verified'
  )

  ID = Column(
    types.String(),
    primary_key=True,
    default=generate_uuid
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
    schema.ForeignKey('user_roles.slug')
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

  def __init__(
    self, username: str, email: str, password: str, role: str,
    first_name: str = None, last_name: str = None, verified: bool = False
  ) -> None:
    self.first_name = first_name
    self.last_name = last_name
    self.username = username
    self.email = email
    self.role = role
    self.verified = verified
    self.password = hash_password(password)

  def verify_password(self, password: str) -> bool:
    return verify_password(password, self.password)