from sqlalchemy import sql, orm, types, Column

from ...models import Base
from ...utils.helpers.core import generate_uuid


class UserToken(Base):
  __tablename__ = 'user_tokens'

  ID = Column(
    types.String(),
    primary_key=True,
    default=generate_uuid()
  )

  user_id = Column(
    types.String(),
    sql.ForeignKey('users.ID')
  )

  type = Column(
    types.Enum('email_verification', 'reset_password'),
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
