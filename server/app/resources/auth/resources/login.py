import falcon, datetime

from app.models.user import User, UserRole, UserSession
from app.utils.hashing import hash_password, verify_password, generate_session_id


class LoginResource:
  def on_get(self, req, resp):
    username = req.get_param('username') or ''
    password = req.get_param('password') or ''
    remember = req.get_param_as_bool('remember') or False

    user = self.db_session.query(User).filter(User.username==username).first()
    if user is None:
      raise falcon.HTTPNotFound(title='User not found', description='Invalid Username or Password.')
    
    if not verify_password(user.password, password):
      raise falcon.HTTPNotFound(title='User not found', description='Invalid Username or Password.')

    session_token = generate_session_id()
    session_exipres = 60 * 60 * 24 * 7 if remember else 60 * 60 * 24 * 1
    session_expire_date = (datetime.datetime.now() + datetime.timedelta(seconds=session_exipres))

    session = UserSession(user_id=user.ID, token=session_token, expires=session_expire_date)

    self.db_session.add(session)
    self.db_session.commit()

    response = {
      'status': True,
      'user': {
        'username': user.username,
        'role': user.role,
        'id': user.ID
      }
    }

    resp.media = response
