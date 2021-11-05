class GraphqlResource:
  def on_get(self, req, resp):
    response = {
      'status': True
    }

    resp.media = response
