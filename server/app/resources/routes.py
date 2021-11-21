from .auth.routes import register as auth_routes
from .user.routes import register as user_routes


server_routes = [
  auth_routes,
  user_routes
]