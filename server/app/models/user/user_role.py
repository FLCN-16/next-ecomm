from sqlalchemy import sql, types, Column

from ...models import Base
from ...utils.helpers.core import generate_uuid


class UserRole(Base):
  __tablename__ = 'user_roles'

  ID = Column(
    types.String(),
    primary_key=True,
    default=generate_uuid()
  )

  name = Column(
    types.String(length=50),
    unique=True
  )

  slug = Column(
    types.String(length=50),
    unique=True
  )

  description = Column(
    types.String(length=255)
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
    default=sql.func.now()
  )

  #Relationships
  users = sql.orm.relationship(
    'User',
    backref='user_role',
    lazy='dynamic'
  )
