# Generated by Django 2.2.5 on 2019-09-05 10:13

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cookbook', '0007_delete_subscriber'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='ingredients',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), default=['eggs'], size=None),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='recipe',
            name='method',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.TextField(), default=['Crack eggs'], size=None),
            preserve_default=False,
        ),
    ]
