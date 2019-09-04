from django.urls import path
from .views import RecipeListView, RecipeDetailView, MealListView, MealDetailView

urlpatterns = [
    path('recipes/', MealListView.as_view()),
    path('recipes/<int:pk>/', MealDetailView.as_view()),
    path('meals/', MealListView.as_view()),
    path('meals/<int:pk>/', MealDetailView.as_view()),
]
