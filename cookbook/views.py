import os
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly

from dotenv import load_dotenv
load_dotenv()
from .models import Meal, Recipe, Comment
from .serializers import MealSerializer, RecipeSerializer, PopulatedMealSerializer, PopulatedRecipeSerializer, CommentSerializer

class RecipeListView(APIView):

    permission_classes = (IsOwnerOrReadOnly,)

    def get(self, _request):
        recipes = Recipe.objects.all()
        serializer = PopulatedRecipeSerializer(recipes, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data

        app_id = os.getenv("APPID")
        app_key = os.getenv("APPKEY")

        r = requests.post('https://api.edamam.com/api/nutrition-details',
            params={'app_id':app_id, 'app_key':app_key},
            json={'title': data['title'], 'ingr': data['ingredients']}
        )

        stats = r.json()['totalNutrients']
        nutrition = {
            'calories': round(stats['ENERC_KCAL']['quantity']),
            'fat': round(stats['FAT']['quantity']),
            'saturates': round(stats['FASAT']['quantity']),
            'carbs': round(stats['CHOCDF']['quantity']),
            'sugars': round(stats['SUGAR']['quantity']),
            'fibre': round(stats['FIBTG']['quantity']),
            'protein': round(stats['PROCNT']['quantity']),
            'salt': round(stats['NA']['quantity'])
        }
        data = {**data, **nutrition}

        serializer = RecipeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            recipe = serializer.instance
            serializer = PopulatedRecipeSerializer(recipe)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class RecipeDetailView(APIView):

    permission_classes = (IsOwnerOrReadOnly,)

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

    permission_classes = (IsOwnerOrReadOnly,)

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

    permission_classes = (IsOwnerOrReadOnly,)

    def get(self, _request, pk):
        meal = Meal.objects.get(pk=pk)
        serializer = PopulatedMealSerializer(meal)
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

class CommentView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            comment = serializer.instance
            serializer = CommentSerializer(comment)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class CommentListView(APIView):

    permission_classes = (IsOwnerOrReadOnly,)

    def get(self, _request, recipe):
        comments = Comment.objects.all().filter(recipe=recipe)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

class CommentDetailView(APIView):

    permission_classes = (IsOwnerOrReadOnly,)

    def get(self, _request, pk):
        comment = Comment.objects.get(pk=pk)
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    def put(self, request, pk):
        comment = Comment.objects.get(pk=pk)
        serializer = RecipeSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=422)

    def delete(self, _request, pk):
        comment = Comment.objects.get(pk=pk)
        comment.delete()

        return Response(status=204)
