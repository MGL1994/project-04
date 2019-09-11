from unittest import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from .models import Recipe, Meal, Tag, Equipment

TestCase.maxDiff = None

class RecipeTests(APITestCase):

    def setUp(self):

        user = User.objects.create(username='test', email='test@ga.co')
        meal = Meal.objects.create(name='Breakfast', user=user)
        tags = Tag.objects.create(name='Vegetarian')
        equipment = Equipment.objects.create(name='Frying Pan')
        recipe = Recipe.objects.create(title='Omlette', image='https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/09/omelette.jpg?itok=7K3AxA-w', ingredients=['3 eggs', 'Pinch of Salt', 'Pinch of Pepper', '1 tbsp Olive Oil'], prep_time='00:05', cook_time='00:05', portions=1, method=['Beat the eggs', 'Heat the oil in the pan', 'Pour the eggs and cook until set', 'Season with salt and pepper'], meal=meal, created='2019-08-08', user=user)

        recipe.tags.set([tags])
        recipe.equipment.set([equipment])

        self.client.force_authenticate(user=user)



    def test_recipes_index(self):

        """
        Should return an array of Recipes
        """

        url = reverse('recipes-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [{
            "id": 1,
            "equipment": [
                {
                    "id": 1,
                    "name": "Frying Pan"
                }
            ],
            "meal": {
                "id": 1,
                "name": "Breakfast"
                },
            "tags": [
                {
                    "id": 1,
                    "name": "Vegetarian"
                    }
            ],
            "user": {
                "id": 1,
                "username": "test"
                },
            "comments": [],
            "title": "Omlette",
            "image": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/09/omelette.jpg?itok=7K3AxA-w",
            "ingredients": [
                '3 eggs',
                'Pinch of Salt',
                'Pinch of Pepper',
                '1 tbsp Olive Oil'
            ],
            "prep_time": "00:05:00",
            "cook_time": "00:05:00",
            "portions": 1,
            "method": [
                'Beat the eggs',
                'Heat the oil in the pan',
                'Pour the eggs and cook until set',
                'Season with salt and pepper'
            ],
            "created": "2019-08-08",
            "calories": None,
            "fat": None,
            "saturates": None,
            "carbs": None,
            "sugars": None,
            "fibre": None,
            "protein": None,
            "salt": None
        }])



    def test_recipes_create(self):

        """
        Should return the created recipe
        """

        url = reverse('recipes-list')
        data = {
            "title": "Omlette with Cheese",
            "image": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/09/omelette.jpg?itok=7K3AxA-w",
            "ingredients": ["3 eggs", "300g Cheese", "Pinch of Salt", "Pinch of Pepper", "1 tbsp Olive Oil"],
            "prep_time": "00:05",
            "cook_time": "00:05",
            "portions": 1,
            "method": ["Beat the eggs", "Heat the oil in the pan", "Pour the eggs and cook until set", "Sprinkle cheese on top", "Season with salt and pepper"],
            "meal": 1,
            "created": "2019-08-08",
            "user": 1,
            "equipment": [1],
            "tags": [1]
        }
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Recipe.objects.count(), 2)
        self.assertJSONEqual(response.content, {
            "id": 2,
            "equipment": [
                {
                    "id": 1,
                    "name": "Frying Pan"
                }
            ],
            "meal": {
                "id": 1,
                "name": "Breakfast"
                },
            "tags": [
                {
                    "id": 1,
                    "name": "Vegetarian"
                    }
            ],
            "user": {
                "id": 1,
                "username": "test"
                },
            "comments": [],
            "title": "Omlette with Cheese",
            "image": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/09/omelette.jpg?itok=7K3AxA-w",
            "ingredients": [
                '3 eggs',
                '300g Cheese',
                'Pinch of Salt',
                'Pinch of Pepper',
                '1 tbsp Olive Oil'
            ],
            "prep_time": "00:05:00",
            "cook_time": "00:05:00",
            "portions": 1,
            "method": [
                'Beat the eggs',
                'Heat the oil in the pan',
                'Pour the eggs and cook until set',
                'Sprinkle cheese on top',
                'Season with salt and pepper'
            ],
            "created": "2019-08-08",
            "calories": 1522,
            "fat": 127,
            "saturates": 64,
            "carbs": 5,
            "sugars": 1,
            "fibre": 0,
            "protein": 88,
            "salt": 2115
        })

        self.client.force_authenticate(user=None) # remove authentication
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 401)
