from app.utils.database import Database

from app.models import Base, user
from app.models.seeder import Seeder


class SQLAlchemySessionManager:
  """
  Create a scoped session for every request and close it when the request
  ends.
  """

  def __init__(self):
    # Setup Database
    self.db_session = Database.get_session()

    Base.metadata.create_all(Database.get_engine())

    # Seeder
    Seeder(self.db_session)

  def process_resource(self, req, resp, resource, params):
    resource.db_session = self.db_session()

  def process_response(self, req, resp, resource, req_succeeded):
    if hasattr(resource, 'db_session'):
      self.db_session.remove()
