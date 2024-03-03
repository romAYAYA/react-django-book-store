# Generated by Django 5.0.2 on 2024-03-03 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
        ("django_app", "0003_alter_customuser_avatar"),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="groups",
            field=models.ManyToManyField(
                blank=True,
                help_text="The groups this user belongs to.",
                related_name="custom_users",
                to="auth.group",
                verbose_name="Groups",
            ),
        ),
    ]
