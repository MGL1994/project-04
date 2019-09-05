from django.db import models
from django.contrib.auth.models import User
from cookbook.models import Recipe

class Subscriber(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favourite_recipes = models.ManyToManyField(Recipe, related_name='recipes', blank=True)

    def __str__(self):
        return f'{self.user}'
