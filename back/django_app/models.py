from django.contrib.auth.models import User, Group
from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils import timezone


class Logs(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_index=True, null=True)
    ip_address = models.CharField(max_length=40, db_index=True)
    date = models.DateTimeField(default=timezone.now, db_index=True)

    def __str__(self):
        return f"{self.ip_address} {self.date} {self.user}"


class CustomUser(models.Model):
    user = models.ForeignKey(
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
