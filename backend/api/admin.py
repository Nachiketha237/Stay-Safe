from django.contrib import admin
from .models import Users, Volunteer, Blogs, Announcement, Alert, HelpRequest

# Register your models here.


admin.site.register(Users)
admin.site.register(Volunteer)
admin.site.register(Blogs)
admin.site.register(Announcement)
admin.site.register(Alert)
admin.site.register(HelpRequest)    