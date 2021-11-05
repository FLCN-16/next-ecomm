import logging
import logging.config

from server import settings


class GunicornFilter(logging.Filter):
  def filter(self, record: logging.LogRecord) -> bool:  # pragma: no cover
    # workaround to remove the duplicate access log
    if '"- - HTTP/1.0" 0 0' in record.msg:
      return False
    else:
      return True


def setup_logging():
  config = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {"gunicorn_filter": {"()": GunicornFilter}},
    "formatters": {
      "standard": {
        "format": settings.LOG_FORMAT,
        "datefmt": settings.LOG_DATE_FORMAT,
      }
    },
    "handlers": {
      "console": {
        "formatter": "standard",
        "class": "logging.StreamHandler",
        "filters": ["gunicorn_filter"],
      }
    },
    "loggers": {
      "": {
        "handlers": settings.LOG_HANDLERS,
        "level": settings.LOG_LEVEL,
      }
    },
  }

  logging.config.dictConfig(config)
