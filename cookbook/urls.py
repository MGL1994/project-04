from django.urls import path
from .views import RecipeListView, RecipeDetailView, MealListView, MealDetailView, CommentListView, CommentDetailView, CommentView, EquipmentListView, TagListView

urlpatterns = [
    path('recipes/', RecipeListView.as_view(), name='recipes-list'),
    path('recipes/<int:pk>/', RecipeDetailView.as_view()),
    # path('recipes/<int:pk>/comments/', CommentListView.as_view()),
    path('meals/', MealListView.as_view()),
    path('meals/<int:pk>/', MealDetailView.as_view()),
    path('comments/', CommentView.as_view()),
    path('comments/<int:pk>/', CommentDetailView.as_view()),
    path('equipment/', EquipmentListView.as_view()),
    path('tags/', TagListView.as_view()),
]
