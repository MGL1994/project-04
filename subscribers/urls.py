from django.urls import path
from .views import SubscriberListView

urlpatterns = [
    path('subscribers/', SubscriberListView.as_view()),
]
