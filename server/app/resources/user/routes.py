import falcon

from . import resources


def register(app: falcon.API):
  app.add_route('/user', resources.UserResource())
