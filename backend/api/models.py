from django.db import models
from django.contrib.auth.models import User

class Users(models.Model):
    user= models.OneToOneField(User, on_delete=models.CASCADE, related_name='user')
    username = models.CharField(max_length=255,unique=True,default="")
    email = models.EmailField(null=True, blank=True)
    is_staff = models.BooleanField(default=True)

    def __str__(self):
        return self.user.username


class Volunteer(models.Model):
    VOLUNTEER_TYPES = [
        ('Medical', 'Medical'),
        ('Shelter', 'Shelter'),
        ('Search and Rescue', 'Search and Rescue'),
        ('Other', 'Other'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    city = models.CharField(max_length=100)
    availability = models.BooleanField(default=True)
    type = models.CharField(max_length=50, choices=VOLUNTEER_TYPES)

class Blogs(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    url = models.URLField(blank=True)

    def __str__(self):
        return self.title
    
class Announcement(models.Model):
    ANNOUNCEMENT_TYPES = [
        ('Event', 'Event'),
        ('News', 'News'),
        ('Alert', 'Alert'),
    ]

    title = models.CharField(max_length=100)
    content = models.TextField()
    owner = models.ForeignKey(Users, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    type = models.TextField(choices=ANNOUNCEMENT_TYPES)

    def __str__(self):
        return self.title

class Alert(models.Model):
    ALERT_TYPES = [
        ('Earthquake', 'Earthquake'),
        ('Wildfire', 'Wildfire'),
        ('Flood', 'Flood'),
        ('Land Slide', 'Land Slide'),
        ('Other', 'Other'),
    ]
    
    title = models.CharField(max_length=100)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    type = models.TextField(choices=ALERT_TYPES)

    def __str__(self):
        return self.title
    
class HelpRequest(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    owner = models.ForeignKey(Users, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=100)


    def __str__(self):
        return self.title

