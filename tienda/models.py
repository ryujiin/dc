from django.db import models

# Create your models here.
class SliderHome(models.Model):
	titulo = models.CharField(max_length=120,blank=True,null=True)
	activo = models.BooleanField(default=True)
	estilos = models.CharField(max_length=120,blank=True,null=True)
	link = models.CharField(max_length=120,blank=True,null=True)
	creado = models.DateTimeField(auto_now_add=True)
	imagen = models.ImageField(upload_to='slider/home/')
	