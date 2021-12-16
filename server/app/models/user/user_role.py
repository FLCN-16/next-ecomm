from sqlalchemy import sql, schema, orm, types, Column
from sqlalchemy_serializer import SerializerMixin, serializer

from app.models import Base
from app.utils.helpers.core import generate_uuid


class UserRole(Base, SerializerMixin):
  __tablename__ = 'user_roles'

  serialize_only = ('ID', 'name', 'slug', 'description')

  ID = Column(
    types.String(),
    primary_key=True,
    default=generate_uuid
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
    lazy='select'
  )

  capabilities = orm.relationship(
    'Capability',
    secondary='user_role_capabilities',
    backref='user_roles',
    lazy='select'
  )

  def __init__(self, name, slug, description, capabilities=None):
    self.name = name
    self.slug = slug
    self.description = description

    if capabilities:
      self.capabilities = capabilities

    if self.ID is None:
      self.ID = generate_uuid()

  def has_cap(self, cap):
    return self.capabilities.filter(Capability.slug == cap).count() > 0


class Capability(Base, SerializerMixin):
  __tablename__ = 'capabilities'

  serialize_only = ('ID', 'name', 'slug', 'description')

  ID = Column(
    types.String(),
    primary_key=True,
    default=generate_uuid
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
    default=generate_uuid
  )

  user_role_id = Column(
    types.String(),
    schema.ForeignKey('user_roles.ID'),
    nullable=False
  )

  capability_id = Column(
    types.String(),
    schema.ForeignKey('capabilities.ID'),
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