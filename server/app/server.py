from gunicorn.app.base import BaseApplication


class Application(BaseApplication):
  def __init__(self, app, options=None):
    self.options = options or {}
    self.application = app
    super(Application, self).__init__()
