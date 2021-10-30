import falcon

from server import settings
from server.utils import error

from server.resources.routes import server_routes
from server.graphql.resource import GraphqlResource


def create_app() -> falcon.App:
  app = falcon.App(middleware=settings.MIDDLEWARES)

  # Add Handlers
  app.req_options.media_handlers.update(settings.MEDIA_HANDLERS)
  app.resp_options.media_handlers.update(settings.MEDIA_HANDLERS)

  # Add Error Handler
  app.add_error_handler(Exception, error.error_handler)

  # Setup graphql
  app.add_route('/graphql', GraphqlResource())

  # Setup REST Routes
  setup_routes(app)

  return app


def setup_routes(app):
  for routes in server_routes:
    routes(app)
