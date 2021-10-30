from server.middlewares import RouterMiddleware
from server.middlewares import CorsMiddleware
from server.middlewares import SQLAlchemySessionManager

MIDDLEWARES = [
  RouterMiddleware(),
  CorsMiddleware(),
  SQLAlchemySessionManager()
]