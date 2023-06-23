from django.urls import path
from .views import index, how, get_answer

urlpatterns = [
    path('', index, name="homePage"),
    path('how', how, name="how"),
    path('get_answer/', get_answer, name="get_answer"),
]