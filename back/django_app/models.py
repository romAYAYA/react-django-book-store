from django.contrib.auth.models import User, Group
from django.core.validators import FileExtensionValidator
from django.db import models


class CustomUser(models.Model):
    user = models.OneToOneField(
        verbose_name="User Profile",
        db_index=True,
        primary_key=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        max_length=300,
        #
        to=User,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    avatar = models.ImageField(
        verbose_name="Avatar",
        validators=[FileExtensionValidator(["jpg", "png", "jpeg"])],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        upload_to="avatars",
    )
    groups = models.ManyToManyField(
        Group,
        related_name="custom_users",
        blank=True,
        verbose_name="Groups",
        help_text="The groups this user belongs to.",
    )


class Book(models.Model):
    title = models.CharField(
        verbose_name="Book title",
        db_index=True,
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=False,
        default="",
        max_length=300,
    )
    description = models.TextField(
        verbose_name="Book description",
        db_index=False,
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=False,
        default="",
    )
    book_file = models.FileField(
        verbose_name="Book file",
        validators=[FileExtensionValidator(["pdf", "docx", "FB2"])],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        upload_to="books",
    )
