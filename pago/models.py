from django.db import models

# Create your models here.
class MetodoPago(models.Model):
	nombre = models.CharField(max_length=100,blank=True,null=True)
	descripcion =models.TextField(blank=True,null=True)