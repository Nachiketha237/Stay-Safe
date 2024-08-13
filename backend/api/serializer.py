from .models import Blogs, Announcement, Alert, HelpRequest, Users,Volunteer
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'user','username', 'email', 'is_staff']
        extra_kwargs = {
            'user': {'read_only': True}
        }
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        validate_password(data['password'])  # Validate password using Django's validators
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        Users.objects.create(user=user, email=user.email)  # Create associated Users object
        return user


class BlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogs
        fields = ['id', 'title', 'content', 'url', 'date', 'owner']
        
class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = ['id','name','email','phone','city','availability','type']
    

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = ['id','title','content','owner','date','type']

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = ['id','title','content','date','type']


class HelpRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = HelpRequest
        fields = ['id','title','content','owner','date','type']
