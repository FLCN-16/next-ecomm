import falcon


class LoginResource:
  def on_get(self, req, resp):
    response = {
      'status': True
    }

    resp.media = response
