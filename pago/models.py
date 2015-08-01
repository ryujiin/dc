from django.db import models

# Create your models here.
class MetodoPago(models.Model):
	nombre = models.CharField(max_length=100,blank=True,null=True)
	descripcion =models.TextField(blank=True,null=True)

	def __unicode__(self):
		return self.nombre

class Pago(models.Model):
	cantidad = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
	id_pago = models.CharField(max_length=100,blank=True,null=True)
	fecha = models.DateTimeField(auto_now_add=True, db_index=True)
	metodo_pago = models.ForeignKey(MetodoPago,blank=True,null=True)
	descripcion = models.CharField(max_length=100,blank=True,null=True)

	def __unicode__(self):
		return self.id_pago