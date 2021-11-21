import jwt
from app.models.user import UserRole


class Permissions:
  def __init__(self, token) -> None:
    self.token = token
    self.user_role = None
    self.permissions = []

    jwt_data = jwt.decode(token, verify=True, algorithms=['HS256'])
    if jwt_data:
      self.user_role = jwt_data['role']