from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.contrib.auth.models import User

class Equipment(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.name}'

class Meal(models.Model):
    name = models.CharField(max_length=50)
    user = models.ForeignKey(User, related_name='meals', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}'

class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.name}'

class Recipe(models.Model):
    title = models.CharField(max_length=100)
    image = models.CharField(max_length=200)
    ingredients = ArrayField(models.CharField(max_length=100))
    equipment = models.ManyToManyField(Equipment, related_name='recipes')
    prep_time = models.DurationField()
    cook_time = models.DurationField()
    portions = models.IntegerField()
    method = ArrayField(models.TextField())
    meal = models.ForeignKey(Meal, related_name='recipes', on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, related_name='recipes', blank=True)
    created = models.DateTimeField(blank=True, null=True)
    user = models.ForeignKey(User, related_name='recipes', blank=True, null=True, on_delete=models.CASCADE)
    calories = models.IntegerField(blank=True, null=True)
    fat = models.IntegerField(blank=True, null=True)
    saturates = models.IntegerField(blank=True, null=True)
    carbs = models.IntegerField(blank=True, null=True)
    sugars = models.IntegerField(blank=True, null=True)
    fibre = models.IntegerField(blank=True, null=True)
    protein = models.IntegerField(blank=True, null=True)
    salt = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f'{self.title}'

class Comment(models.Model):
    content = models.TextField()
    user = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, related_name='comments', on_delete=models.SET_NULL, blank=True, null=True,)

    def __str__(self):
        return f'{self.content}'
