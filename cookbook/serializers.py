from rest_framework import serializers
from .models import Equipment, Tag, Meal, Comment, Recipe

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
        fields = ('id', 'content', )

class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = ('id', 'title', 'image', 'equipment', 'prep_time', 'cook_time', 'portions', 'meal', 'tags', 'created', 'comments', )

class PopulatedMealSerializer(MealSerializer):
    recipes = RecipeSerializer(many=True)

    class Meta(MealSerializer.Meta):
        fields = ('id', 'name', 'recipes', )

class PopulatedRecipeSerializer(RecipeSerializer):
    equipment = EquipmentSerializer(many=True)
    meal = MealSerializer()
    tags = TagSerializer(many=True)
    comments = CommentSerializer(many=True)
