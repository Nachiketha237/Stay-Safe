from django.contrib import admin
from django.urls import path
from rest_framework import routers
from api.views import UsersViewSet, BlogsViewSet, AnnouncementViewSet, AlertViewSet, HelpRequestViewSet, VolunteerViewSet
from django.conf.urls import include
from rest_framework_simplejwt import views as jwt_views
from api import views


router = routers.DefaultRouter()
router.register(r'users', UsersViewSet)
router.register(r'blogs', BlogsViewSet)
router.register(r'volunteer', VolunteerViewSet,basename='volunteer')
router.register(r'announcement', AnnouncementViewSet,basename='announcement')
router.register(r'alert', AlertViewSet,basename='alert')
router.register(r'helprequest', HelpRequestViewSet)





urlpatterns = [
    path('api/token/', 
         jwt_views.TokenObtainPairView.as_view(), 
         name ='token_obtain_pair'), 
    path('api/token/refresh/', 
         jwt_views.TokenRefreshView.as_view(), 
         name ='token_refresh'), 
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/login/', views.login),
    path('api/register/', views.register),
    path('ai/', include('ai.urls')),   
]
