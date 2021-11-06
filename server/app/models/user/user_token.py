import enum
from sqlalchemy import sql, schema, orm, types, Column

from ...models import Base
from ...utils.helpers.core import generate_uuid

@enum.unique
class UserTokenType(enum.Enum):
  """
  Enum for user token types.
  """
  EMAIL_VERIFICATION = 'email_verification'
  RESET_PASSWORD = 'reset_password'


class UserToken(Base):
  __tablename__ = 'user_tokens'

  ID = Column(
    types.String(),
    primary_key=True,
    default=generate_uuid()
  )

  user_id = Column(
    types.String(),
    schema.ForeignKey('users.ID')
  )

  token_type = Column(
    types.Enum(UserTokenType),
    nullable=False
  )

  token = Column(
    types.String(length=255),
    nullable=False
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

  # Relationships

  user = orm.relationship(
    'User',
    backref=orm.backref('user_tokens', cascade='all, delete-orphan')
  )
