import falcon
import datetime
import jwt
from sqlalchemy.orm import lazyload

from app.settings import SECRET_KEY

from app.models.user import User, UserSession, UserRole
from app.utils.hashing import verify_password, generate_session_id


class LoginResource:
  def on_post(self, req, resp):
    login = req.media.get('login') or ''
    password = req.media.get('password') or ''
    remember = req.media.get('remember') or False

    user = self.db_session.query(User).filter(User.username == login).first()
    if user is None or not verify_password(user.password, password):
      raise falcon.HTTPNotFound(
        title='User not found',
        description='Invalid Username or Password.',
      )

    session_token = generate_session_id()
    session_exipres = 60 * 60 * 24 * 7 if remember else 60 * 60 * 24 * 1
    session_expire_date = (datetime.datetime.now() + datetime.timedelta(seconds=session_exipres))

    session = UserSession(user_id=user.ID, token=session_token, expires=session_expire_date)

    self.db_session.add(session)
    self.db_session.commit()

    session_token = jwt.encode({
      'token': session_token,
      'exp': session_expire_date.timestamp()
    }, SECRET_KEY, algorithm='HS256')

    role = self.db_session.query(UserRole).options(
      lazyload(UserRole.capabilities)
    ).filter(UserRole.slug==user.role).first()

    user_capabilities = [cap.slug for cap in role.capabilities]

    response = {
      'status': True,
      'token': session_token,
      'user': {
        'username': user.username,
        'role': role.slug,
        'caps': user_capabilities
      }
    }

    resp.media = response
