from django.db import models
from cliente.models import *
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string

# Create your models here.
class Pedido(models.Model):
	numero_pedido = models.CharField(max_length=120,blank=True,null=True)
	user = models.ForeignKey(User,related_name='Pedido', null=True,blank=True)
	gasto_envio = models.DecimalField(decimal_places=2,max_digits=12)
	direccion_envio = models.ForeignKey(Direccion,blank=True,null=True)
	metodoenvio = models.ForeignKey('MetodoEnvio',blank=True,null=True)
	fecha_compra = models.DateTimeField(auto_now_add=True, db_index=True)
	estado = models.ForeignKey('EstadoPedido')
	total = models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)

	def __unicode__(self):
		return "%s - %s" %(self.estado.nombre,self.numero_pedido)

	def save(self, *args, **kwargs):
		if self.numero_pedido=='':
			self.numero_pedido = get_random_string(length=10)
		super(Pedido, self).save(*args, **kwargs)
		

class EstadoPedido(models.Model):
	nombre = models.CharField(max_length=100)
	descripcion = models.TextField()

	def __unicode__(self):
		return self.nombre

class MetodoEnvio(models.Model):
	nombre = models.CharField(max_length=100)
	descripcion = models.TextField(blank=True,null=True)
	precio = models.DecimalField(decimal_places=2,max_digits=12)