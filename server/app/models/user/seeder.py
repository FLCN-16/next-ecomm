from .user_role import UserRole 

class UserSeeder:
  def __init__(self, db_session):
    self.db_session = db_session
    self.seed()
  
  def seed(self):
    self.create_roles()
  
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
    self.db_session.commit()
