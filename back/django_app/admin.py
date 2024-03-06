from django.contrib import admin
from django_app.models import Book, CustomUser, LoginLogs

admin.site.register(Book)
admin.site.register(CustomUser)
admin.site.register(LoginLogs)