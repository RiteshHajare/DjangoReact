from django.db import models


class Database(models.Model):
    col1 = models.CharField(max_length=50)
    col2 = models.CharField(max_length=50)
    col3 = models.CharField(max_length=50)
# Create your models here.
