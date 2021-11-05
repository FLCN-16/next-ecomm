import falcon
import logging
from gunicorn.app.base import BaseApplication
from app import settings

logger = logging.getLogger(__name__)


class Application(BaseApplication):
  def __init__(self, options=None):
    self.options = options or {}
    super(Application, self).__init__()
  
  def load_config(self):
    config = dict(
      [
        (key, value)
        for key, value in self.options.items()
        if key in self.cfg.settings and value is not None
      ]
    )
    for key, value in config.items():
      self.cfg.set(key.lower(), value)

  def load(self):
    # Initialize Application
    self.application = init_app()
    return self.application


def init_app() -> falcon.API:
  from .app import create_app
  return create_app()


def _post_fork(server=None, w=None):
  init_logger()


def init_logger():
  logger.info("Starting {}".format(settings.APP_NAME))
  # logger.info("Environment: {}".format(settings.APP_ENV_NAME))

if __name__ == '__main__':
  # Gunicorn Server Config
  server_conf = settings.GUNICORN_CONFIG
  server_conf['post_fork'] = _post_fork

  Application(server_conf).run()
