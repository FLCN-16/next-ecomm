from .base import APP_HOST, APP_PORT, APP_DEBUG

GUNICORN_CONFIG = {
  'bind': f"{APP_HOST}:{APP_PORT}",
  'backlog': 8192,
  'threads': 1,
  'workers': 1,
  'worker_class': 'sync',
  'max_requests': 40960,
  'max_requests_jitter': 7040,
  'keepalive': 200,
  'timeout': 30,
  'graceful_timeout': 60,
  'reload': APP_DEBUG,
  'preload': True,
  'errorlog': '-',
  'loglevel': 'debug',
  'accesslog': '-',
  'access_log_format': '%(t)s %(s)s "%(r)s" %(L)s %(b)s',
  'access_log_file': None,
}