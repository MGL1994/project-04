# Generated by Django 2.2.5 on 2019-09-04 15:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cookbook', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='comments',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='recipes', to='cookbook.Comment'),
        ),
    ]