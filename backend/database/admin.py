from django.contrib import admin
from database.models import Database


class Connect(admin.ModelAdmin):
    list_display = ('col1', 'col2', 'col3')


admin.site.register(Database, Connect)

# Register your models here.
