from sqlalchemy import sql, orm, types, Column

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
  users = orm.relationship(
    'User',
    backref='user_role',
    lazy='dynamic'
  )

  capabilties = orm.relationship(
    'Capability',
    secondary='user_role_capabilities',
    backref='user_roles',
    lazy='dynamic'
  )

  def has_cap(self, cap):
    return self.capabilties.filter(Capability.slug == cap).count() > 0


class Capability(Base):
  __tablename__ = 'capabilities'

  ID = Column(
    types.String(),
    primary_key=True,
    default=generate_uuid()
  )

  name = Column(
    types.String(length=50)
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


class UserRoleCapability(Base):
  __tablename__ = 'user_role_capabilities'

  ID = Column(
    types.String(),
    primary_key=True,
    default=generate_uuid()
  )

  user_role_id = Column(
    types.String(),
    sql.ForeignKey('user_roles.ID'),
    nullable=False
  )

  capability_id = Column(
    types.String(),
    sql.ForeignKey('capabilities.ID'),
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
    default=sql.func.now()
  )