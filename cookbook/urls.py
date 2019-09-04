from django.urls import path
from .views import ListView

urlpatterns = [
    path('recipes', ListView.as_view()),
]
