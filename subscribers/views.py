from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Subscriber
from .serializers import PopulatedSubscriberSerializer

class SubscriberListView(APIView):

    def get(self, _request):
        subscribers = Subscriber.objects.all()
        serializer = PopulatedSubscriberSerializer(subscribers, many=True)
        return Response(serializer.data)
