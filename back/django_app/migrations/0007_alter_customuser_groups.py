# Generated by Django 5.0.2 on 2024-03-09 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
        ("django_app", "0006_alter_loginlogs_user"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customuser",
            name="groups",
            field=models.ManyToManyField(
                blank=True,
                related_name="custom_users",
                to="auth.group",
                verbose_name="Groups",
            ),
        ),
    ]
