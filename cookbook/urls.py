from django.urls import path
from .views import RecipeListView, RecipeDetailView, MealListView, MealDetailView, CommentListView, CommentDetailView, CommentView

urlpatterns = [
    path('recipes/', RecipeListView.as_view()),
    path('recipes/<int:pk>/', RecipeDetailView.as_view()),
    path('meals/', MealListView.as_view()),
    path('meals/<int:pk>/', MealDetailView.as_view()),
    path('comments/<int:recipe>/', CommentListView.as_view()),
    path('comments/detail/<int:pk>/', CommentDetailView.as_view()),
    path('comments/', CommentView.as_view())
]
