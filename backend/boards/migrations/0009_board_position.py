# Generated by Django 4.2.8 on 2024-03-28 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0008_remove_board_labels'),
    ]

    operations = [
        migrations.AddField(
            model_name='board',
            name='position',
            field=models.IntegerField(default=0),
        ),
    ]
