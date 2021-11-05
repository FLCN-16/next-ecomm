from ..middlewares import RouterMiddleware
from ..middlewares import CorsMiddleware
from ..middlewares import SQLAlchemySessionManager

MIDDLEWARES = [
  RouterMiddleware(),
  CorsMiddleware(),
  SQLAlchemySessionManager()
]