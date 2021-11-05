import falcon

from . import resources


def register(app: falcon.API):
  app.add_route('/auth/login', resources.LoginResource())
