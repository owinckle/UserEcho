# Generated by Django 4.2.8 on 2024-03-27 17:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('spaces', '0003_alter_space_slug'),
        ('gamify', '0002_remove_spacerank_space_spacerank_member'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spacerank',
            name='member',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='spaces.spacemember'),
        ),
    ]
