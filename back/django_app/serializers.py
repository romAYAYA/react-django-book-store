from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django_app import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ["password", "is_staff", "is_superuser", "last_login"]


class CustomUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    groups = serializers.SerializerMethodField()

    class Meta:
        model = models.CustomUser
        fields = "__all__"

    @staticmethod
    def get_groups(user: models.CustomUser):
        try:
            groups = user.groups.order_by("name")
            groups_names = []
            for group in groups:
                groups_names.append(group.name)
            return groups_names
        except Exception as error:
            return [str(error)]


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Book
        fields = "__all__"
