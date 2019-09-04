from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Equipment, Meal, Tag, Comment, Recipe
from .serializers import EquipmentSerializer, TagSerializer, MealSerializer, CommentSerializer, RecipeSerializer, PopulatedMealSerializer, PopulatedRecipeSerializer

class RecipeListView(APIView):

    def get(self, _request):
        recipes = Recipe.objects.all()
        serializer = PopulatedRecipeSerializer(recipes, many=True)
        return Response(serializer.data)
