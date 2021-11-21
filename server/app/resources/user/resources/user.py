import falcon

from app.models.user import User, UserRole
from app.utils.hashing import hash_password


class UserResource:
  def on_post(self, req, resp):
    """
    Creates a new user
    """
    first_name = req.get_param('first_name') or None
    last_name = req.get_param('last_name') or None
    username = req.get_param('username') or None
    password = req.get_param('password') or None
    email = req.get_param('email') or None
    role = req.get_param('role') or 'customer'
    verified = req.get_param('verified') or False

    role_object = user = self.db_session.query(
        UserRole).filter(User.slug == role).first()
    if not role_object:
      raise falcon.HTTPBadRequest(
          title='Invalid role', description='Role does not exist')

    user = User(
      first_name=first_name,
      last_name=last_name,
      username=username,
      password=password,
      email=email,
      role=role,
      verified=verified
    )

    self.db_session.add(user)
    self.db_session.commit()

    if not user.id:
      raise falcon.HTTPInternalServerError(
        title='Error',
        description='User could not be created'
      )

    resp.status = falcon.HTTP_201
    resp.media = user.to_json()

