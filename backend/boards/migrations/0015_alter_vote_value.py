# Generated by Django 4.2.8 on 2024-04-07 21:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0014_vote'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vote',
            name='value',
            field=models.IntegerField(default=0),
        ),
    ]