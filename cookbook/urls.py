from django.urls import path
from .views import RecipeListView, RecipeDetailView, MealListView, MealDetailView

urlpatterns = [
    path('recipes/', RecipeListView.as_view()),
    path('recipes/<int:pk>/', RecipeDetailView.as_view()),
    path('meals/', MealListView.as_view()),
    path('meals/<int:pk>/', MealDetailView.as_view()),
]
