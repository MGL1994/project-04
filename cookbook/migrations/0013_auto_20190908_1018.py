# Generated by Django 2.2.5 on 2019-09-08 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cookbook', '0012_auto_20190906_1800'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='created',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
