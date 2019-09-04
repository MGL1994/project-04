from django.contrib import admin
from .models import Equipment, Meal, Tag, Comment, Recipe

admin.site.register(Equipment)
admin.site.register(Meal)
admin.site.register(Tag)
admin.site.register(Comment)
admin.site.register(Recipe)
