# Generated by Django 5.0.2 on 2024-03-09 11:24

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("django_app", "0008_rename_loginlogs_logs"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name="customuser",
            name="user",
            field=models.ForeignKey(
                blank=True,
                default=None,
                max_length=300,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="profile",
                to=settings.AUTH_USER_MODEL,
                verbose_name="User Profile",
            ),
        ),
    ]