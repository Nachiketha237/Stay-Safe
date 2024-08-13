from .models import Blogs, Announcement, Alert, HelpRequest, Users, Volunteer
from rest_framework import serializers
from .serializer import UserSerializer, BlogsSerializer, AnnouncementSerializer, AlertSerializer, HelpRequestSerializer, VolunteerSerializer, UsersSerializer
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, mixins
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.exceptions import PermissionDenied
from .permissions import IsAdminUser
from rest_framework.decorators import action



class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
    permission_classes = [permissions.IsAuthenticated]

class UsersViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.username)


    def perform_update(self, serializer):
        serializer.save()


class BlogsViewSet(viewsets.ModelViewSet):
    queryset = Blogs.objects.all()
    serializer_class = BlogsSerializer

    def get_queryset(self):
        return Blogs.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        user = Users.objects.get(user=self.request.user)  # Convert User instance to Users instance
        serializer.save(owner=user)
        
    def perform_destroy(self, instance):
        if instance.owner == self.request.user:
            instance.delete()
        else:
            raise PermissionDenied("You do not have permission to delete this blog.")

    @action(detail=False, methods=['get'])
    def get_blogs(self, request, *args, **kwargs):
        # If you want to allow unauthenticated access to this specific action
        self.permission_classes = []  # No permissions required for this action
        blogs = self.get_queryset()
        serializer = self.get_serializer(blogs, many=True)
        return Response(serializer.data)

    

class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

    def get_queryset(self):
        # Filter queryset to return only volunteers associated with the current user
        return Volunteer.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # Update the volunteer with the current user as the owner
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            print(serializer.errors)  # Debug validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(serializer.data)
        else:
            print(serializer.errors)  # Debug validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Announcement.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_destroy(self, instance):
        if instance.owner == self.request.user:
            instance.delete()
        else:
            raise PermissionDenied("You do not have permission to delete this announcement.")
        
class AlertViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    permission_classes = [IsAdminUser]  # Only admin can CRUD announcements

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_destroy(self, instance):
        if instance.owner == self.request.user:
            instance.delete()
        else:
            raise PermissionDenied("You do not have permission to delete this announcement.")

class HelpRequestViewSet(viewsets.ModelViewSet):
    queryset = HelpRequest.objects.all()
    serializer_class = HelpRequestSerializer

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data.get('username')
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        # Check if email already exists
        if User.objects.filter(email=email).exists():
            return Response({'email': ['Email address already exists.']}, status=status.HTTP_400_BAD_REQUEST)

        # Create user and profile if email is unique
        user = User.objects.create_user(username=username, email=email, password=password)
        Users.objects.create(user=user, email=email)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if email is None or password is None:
        return Response({'error': 'Please provide both email and password'}, status=status.HTTP_400_BAD_REQUEST)

    # Find the user by email
    try:
        user = Users.objects.get(email=email).user
    except Users.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    user = authenticate(username=user.username, password=password)

    if user is None:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    # Generate tokens for the authenticated user
    try:
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
    except Exception as e:
        print(e)
        return Response({'error': 'Token generation failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    print(f"Access token generated for user {user.username}: {access_token}")
    return Response({
        'access_token': str(access_token),
        'refresh_token': str(refresh),
    }, status=status.HTTP_200_OK)





