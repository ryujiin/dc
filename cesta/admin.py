from django.contrib import admin
from models import *

# Register your models here.
class CarroAdmin(admin.ModelAdmin):
	list_display = ('id','propietario','sesion_carro','estado')

admin.site.register(Carro,CarroAdmin)
admin.site.register(LineaCarro)