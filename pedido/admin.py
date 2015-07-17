from django.contrib import admin
from models import *
# Register your models here.

class EstadoPedidoAdmin(admin.ModelAdmin):
	list_display = ('nombre','slug_estado',)


admin.site.register(Pedido)
admin.site.register(EstadoPedido,EstadoPedidoAdmin)
admin.site.register(MetodoEnvio)
admin.site.register(ModificacionPedido)
