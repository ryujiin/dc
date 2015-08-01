from django.contrib import admin
from models import *
# Register your models here.
class PagoAdmin(admin.ModelAdmin):
	list_display = ('id_pago','cantidad','descripcion')

admin.site.register(MetodoPago)
admin.site.register(Pago,PagoAdmin)
