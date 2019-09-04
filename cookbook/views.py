from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Equipment, Meal, Tag, Comment, Recipe
from .serializers import EquipmentSerializer, TagSerializer, MealSerializer, RecipeSerializer, PopulatedMealSerializer, PopulatedRecipeSerializer

class RecipeListView(APIView):

    def get(self, _request):
        recipes = Recipe.objects.all()
        serializer = PopulatedRecipeSerializer(recipes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            recipe = serializer.instance
            serializer = PopulatedRecipeSerializer(recipe)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class RecipeDetailView(APIView):

    def get(self, _request, pk):
        recipe = Recipe.objects.get(pk=pk)
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)

    def put(self, request, pk):
        recipe = Recipe.objects.get(pk=pk)
        serializer = RecipeSerializer(recipe, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=422)

    def delete(self, _request, pk):
        recipe = Recipe.objects.get(pk=pk)
        recipe.delete()

        return Response(status=204)

class MealListView(APIView):

    def get(self, _request):
        meals = Meal.objects.all()
        serializer = PopulatedMealSerializer(meals, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MealSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            meal = serializer.instance
            serializer = PopulatedMealSerializer(meal)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class MealDetailView(APIView):

    def get(self, _request, pk):
        meal = Meal.objects.get(pk=pk)
        serializer = MealSerializer(meal)
        return Response(serializer.data)

    def put(self, request, pk):
        meal = Meal.objects.get(pk=pk)
        serializer = MealSerializer(meal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=422)

    def delete(self, _request, pk):
        meal = Meal.objects.get(pk=pk)
        meal.delete()

        return Response(status=204)
