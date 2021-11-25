from app.models.user import UserRole, User


class Seeder:
  def __init__(self, db_session):
    self.db_session = db_session

    self.seed()

    self.db_session.close()

  def seed(self):
    self.create_roles()
    self.create_users()

    self.db_session.commit()

  def create_roles(self):
    roles = [
      UserRole(
        name="Admin",
        slug="admin",
        description="Administrator"
      ),
      UserRole(
        name="Manager",
        slug="manager",
        description="Shop Manager"
      ),
      UserRole(
        name="Developer",
        slug="developer",
        description="Developer"
      )
    ]

    self.db_session.add_all(roles)

  def create_users(self):
    users = [
      User(
        username="admin",
        email="admin@gmail.com",
        password="admin",
        role="admin",
        verified=True
      )
    ]

    self.db_session.add_all(users)