import os
import falcon


APP_NAME = "Falcon Server"

APP_HOST = '0.0.0.0'
APP_PORT = 5000
APP_DEBUG = True

SECRET_KEY = os.environ.get('SECRET_KEY')
DATABASE_URL = os.environ.get('DATABASE_URL')

JSON_DATETIME_MODE = 'DM_ISO8601'
JSON_UUID_MODE = 'UM_HEX'

MEDIA_HANDLERS = {
  falcon.MEDIA_JSON: falcon.media.JSONHandler()
}