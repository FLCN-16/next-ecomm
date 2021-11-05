from sqlalchemy import sql, types, Column

from ...models import Base
from ...utils.helpers.core import generate_uuid


class UserAddress(Base):
  __tablename__ = 'user_address'

  ID = Column(
    types.String(),
    primary_key=True,
    default=generate_uuid()
  )

  label = Column(
    types.String(length=50)
  )

  type = Column(
    types.Enum('home', 'work', 'other'),
  )

  street = Column(
    types.String(length=50),
  )

  city = Column(
    types.String(length=50),
  )

  state = Column(
    types.String(length=50),
    nullable=True
  )

  zip = Column(
    types.String(length=50),
    nullable=True
  )

  country = Column(
    types.String(length=50),
    default='United States',
  )

  user_id = Column(
    types.String(),
    sql.ForeignKey('user.ID'),
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

  #Relationships
  user = sql.orm.relationship('User', back_populates='addresses')
