from server.settings import DATABASE_URL
from sqlalchemy import create_engine, orm as sqlAlchemyORM


class SQLAlchemySessionManager:
  """
  Create a scoped session for every request and close it when the request
  ends.
  """

  def __init__(self):
    # Setup Database
    db_engine = create_engine(DATABASE_URL, echo=True)

    # Prepare a DB session
    session_maker = sqlAlchemyORM.sessionmaker(bind=db_engine)
    scoped_session = sqlAlchemyORM.scoped_session(session_maker)

    self.db_session = scoped_session

  def process_resource(self, req, resp, resource, params):
    resource.db_session = self.db_session()

  def process_response(self, req, resp, resource, req_succeeded):
    if hasattr(resource, 'db_session'):
      self.db_session.remove()
