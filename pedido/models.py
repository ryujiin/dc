from django.db import models
from cliente.models import *
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from django.template.defaultfilters import slugify
from django.utils.translation import ugettext_lazy as _


# Create your models here.
class Pedido(models.Model):
	AUTENTICADO, METODO_ENVIO, METODO_PAGO, PAGADO, ERROR_PAGO, ESPERANDO_ENVIO, ENVIADO, DEVUELTO = (
        "autenticado", "metodo_envio", "metodo_pago", "pagado", "error_pago", "esperando_envio", "enviado", "devuelto")
	ESTADO_ELECCION = (
        (AUTENTICADO, _("Autenticado - El usuario se encuentra autenticado y el pedido le pertenece")),
        (METODO_ENVIO, _("Metodo de Envio - Ya coloco el metodo de envio, esperando metodo de pago")),
        (METODO_PAGO, _("Metodo de Pago - Ya selecciono el metodo de pago")),
        (PAGADO, _("Pagado - El pago se realizo correctamente, espere el envio del producto")),
        (ERROR_PAGO, _("Error en Pago - Ocurrio un error al pagar")),
        (ENVIADO, _("Enviado - El producto fue enviado")),
        (DEVUELTO, _("Devuelto - El producto fue devuelto")),
    )
	numero_pedido = models.CharField(max_length=120,blank=True,null=True)
	user = models.ForeignKey(User,related_name='Pedido', null=True,blank=True)
	gasto_envio = models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)
	direccion_envio = models.ForeignKey(Direccion,blank=True,null=True)
	metodoenvio = models.ForeignKey('MetodoEnvio',blank=True,null=True)
	fecha_compra = models.DateTimeField(auto_now_add=True, db_index=True)
	estado_pedido = models.CharField(max_length=120,default=AUTENTICADO,choices=ESTADO_ELECCION)

	def __unicode__(self):
		return "%s - %s" %(self.estado_pedido,self.numero_pedido)

	def save(self, *args, **kwargs):
		if not self.numero_pedido:
			self.numero_pedido = get_random_string(length=10)
		super(Pedido, self).save(*args, **kwargs)
		self.add_modificacion()

	def add_modificacion(self):
		m = ModificacionPedido()
		m.pedido = self
		m.estado_actual = self.estado_pedido
		m.save()
		
class ModificacionPedido(models.Model):
	pedido = models.ForeignKey(Pedido)
	fecha_modificacion = models.DateTimeField(auto_now=True, db_index=True)
	estado_actual = models.CharField(max_length=100)
		
class EstadoPedido(models.Model):
	nombre = models.CharField(max_length=100)
	descripcion = models.TextField()
	slug_estado = models.CharField(max_length=120,blank=True,null=True)

	def __unicode__(self):
		return self.nombre

	def save(self,*args,**kwargs):
		if not self.slug_estado:
			self.slug_estado = slugify(self.nombre)
		super(EstadoPedido,self).save(*args,**kwargs)

class MetodoEnvio(models.Model):
	nombre = models.CharField(max_length=100)
	descripcion = models.TextField(blank=True,null=True)
	precio = models.DecimalField(decimal_places=2,max_digits=12)

class MetodoPago(models.Model):
	nombre = models.CharField(max_length=100)