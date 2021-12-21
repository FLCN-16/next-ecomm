from app.settings import DATABASE_URL
from sqlalchemy import create_engine, orm as sqlAlchemyORM


class Database:
  _engine = None
  _session = None

  def __init__(self):
    # Setup Database
    Database._engine = create_engine(DATABASE_URL, echo=True)

    # Prepare a DB session
    session_maker = sqlAlchemyORM.sessionmaker(bind=Database._engine)
    Database._session = sqlAlchemyORM.scoped_session(session_maker)

  @staticmethod
  def get_engine():
    if Database._engine is None:
      Database()

    return Database._engine

  @staticmethod
  def get_session():
    if Database._session is None:
      Database()

    return Database._session