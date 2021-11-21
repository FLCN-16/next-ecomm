from app import middlewares

MIDDLEWARES = [
  middlewares.RouterMiddleware(),
  middlewares.CorsMiddleware(),
  middlewares.SQLAlchemySessionManager(),
  middlewares.AuthMiddleware()
]