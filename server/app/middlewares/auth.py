import jwt
from app.settings import SECRET_KEY
from app.models.user import User, UserSession


"""
  Auth Middleware

  This middleware is responsible for authenticating the user.
  It will check if the user is authenticated or not.
"""
class AuthMiddleware:
  def process_request(self, req, resp):
    self.token = req.get_header('Authorization') or None # get token from header
    self.session = None
    self.user = None

    if self.token: # if token is present
      try:
        self.token = self.token.split(' ')[1] # Bearer <token>
        token_data = jwt.decode(self.token, SECRET_KEY) # Decode token

        self.session = UserSession.query.get(token_data['session_id']) # Get session
        if self.session and self.session.is_valid(): # Check if session is valid
          self.user = User.query.get(self.session.user_id) # Get user
      except Exception:
        pass
