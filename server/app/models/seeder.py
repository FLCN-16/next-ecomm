from app.models.user import UserRole, User, Capability


class Seeder:
  def __init__(self, db_session):
    self.db_session = db_session

    self.seed()
    # try:
    #   self.seed()
    # except Exception as e:
    #   print(e)

    self.db_session.close()

  def seed(self):
    self.create_role_capabilities()
    self.create_roles()
    self.create_users()

    self.db_session.commit()
  
  def create_role_capabilities(self):
    capabilities = [
      Capability(
        name="Access Admin",
        slug="access_admin",
        description="Can access Admin Panel"
      ),
      Capability(
        name="Create User",
        slug="create_user",
        description="Can Create User"
      ),
      Capability(
        name="Create Role",
        slug="create_role",
        description="Can Create Role"
      )
    ]

    self.db_session.add_all(capabilities)

  def create_roles(self):
    roles = [
      UserRole(
        name="Admin",
        slug="admin",
        description="Administrator",
        capabilities=[
          "access_admin",
          "create_user",
          "create_role"
        ]
      ),
      UserRole(
        name="Manager",
        slug="manager",
        description="Shop Manager",
        capabilities=[
          "access_admin",
          "create_user"
        ]
      ),
      UserRole(
        name="Developer",
        slug="developer",
        description="Developer",
        capabilities=[
          "access_admin",
          "create_user",
          "create_role"
        ]
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