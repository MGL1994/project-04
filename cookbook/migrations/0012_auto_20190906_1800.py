# Generated by Django 2.2.5 on 2019-09-06 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cookbook', '0011_auto_20190905_1429'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='created',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]