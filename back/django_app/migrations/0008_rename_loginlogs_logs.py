# Generated by Django 5.0.2 on 2024-03-09 11:23

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("django_app", "0007_alter_customuser_groups"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name="LoginLogs",
            new_name="Logs",
        ),
    ]
