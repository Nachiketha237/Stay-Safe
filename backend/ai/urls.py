from django.urls import path
from . import views

urlpatterns = [
    path('query/', views.query, name='query'),
    path('predict_flood/', views.predict_flood, name='predict_flood'),
]
