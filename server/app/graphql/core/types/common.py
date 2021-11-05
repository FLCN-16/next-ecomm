import graphene


class Image(graphene.ObjectType):
  url = graphene.String(required=True, description='The URL of the image.')
  alt = graphene.String(description='Alt text for an image.')

  class Meta:
    description = 'Represents an image.'