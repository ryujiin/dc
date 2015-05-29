from django.db import models
from catalogo.models import Firme

# Create your models here.

class StockFirme(models.Model):
	OPERACIONES = (
		('compra','Compra'),
		('gasto','Gasto'),
	)
	firme = models.ForeignKey(Firme)
	cantidad = models.IntegerField()
	fecha = models.DateTimeField(auto_now_add=True)
	operacion = models.CharField(max_length=100,choices=OPERACIONES,blank=True,null=True)
	total = models.IntegerField(blank=True,null=True)

	def save(self, *args, **kwargs):
		suma = 0
		resta = 0
		operaciones = StockFirme.objects.filter(firme=self.firme)
		for ope in operaciones:
			if ope.operacion == 'compra':
				suma = suma + ope.cantidad
			if ope.operacion == 'gasto':
				resta = resta + ope.cantidad
		if self.operacion == 'compra':
			suma = suma + self.cantidad
		else:
			resta = resta + self.cantidad
		self.total = suma - resta
		super(StockFirme, self).save(*args, **kwargs)
