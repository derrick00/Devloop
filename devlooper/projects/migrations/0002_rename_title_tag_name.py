# Generated by Django 4.2.6 on 2023-11-06 06:55

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("projects", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="tag",
            old_name="title",
            new_name="name",
        ),
    ]