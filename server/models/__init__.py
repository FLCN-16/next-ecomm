import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base


metadata = sqlalchemy.MetaData(
  naming_convention={
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
  }
)
# create declarative base
Base = declarative_base(metadata=metadata)
