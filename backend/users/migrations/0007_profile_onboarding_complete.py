# Generated by Django 4.2.8 on 2024-03-16 23:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='onboarding_complete',
            field=models.BooleanField(default=False),
        ),
    ]
