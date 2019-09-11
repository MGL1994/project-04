from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Equipment, Tag, Meal, Comment, Recipe

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', )

class EquipmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Equipment
        fields = ('id', 'name', )

class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ('id', 'name', )

class MealSerializer(serializers.ModelSerializer):

    class Meta:
        model = Meal
        fields = ('id', 'name', )

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('id', 'user', 'content', 'recipe',)

class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = '__all__'

class PopulatedCommentSerializer(CommentSerializer):
    user = UserSerializer()

    class Meta(CommentSerializer.Meta):
        fields = '__all__'

class PopulatedMealSerializer(MealSerializer):
    recipes = RecipeSerializer(many=True)

    class Meta(MealSerializer.Meta):
        fields = ('id', 'name', 'recipes', )

class PopulatedRecipeSerializer(RecipeSerializer):
    equipment = EquipmentSerializer(many=True)
    meal = MealSerializer()
    tags = TagSerializer(many=True)
    user = UserSerializer()
    comments = PopulatedCommentSerializer(many=True)
