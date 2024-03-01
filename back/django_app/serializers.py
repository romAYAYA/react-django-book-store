from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django_app import models


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Book
        fields = "__all__"
