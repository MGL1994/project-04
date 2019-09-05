from rest_framework import serializers
from cookbook.serializers import RecipeSerializer
from .models import Subscriber


class SubscriberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subscriber
        fields = ('user', 'favourite_recipes', )

class PopulatedSubscriberSerializer(SubscriberSerializer):
    favourite_recipes = RecipeSerializer(many=True)
