from django.contrib import admin
from models import *
# Register your models here.

class ProductoImagenInline(admin.TabularInline):
	model = ProductoImagen

class VariacionInline(admin.TabularInline):
	model = ProductoVariacion

class ProductoAdmin(admin.ModelAdmin):
	inlines = [ProductoImagenInline,VariacionInline,]
	filter_horizontal = ('parientes','categorias')
	list_display = ('id','full_name','nombre','slug','get_genero','obtener_categorias')

class CategoriaAdmin(admin.ModelAdmin):
	list_display=('nombre','full_name','slug')

class FirmeAdmin(admin.ModelAdmin):
	list_display=('id','modelo','talla','color')

admin.site.register(Producto,ProductoAdmin)
admin.site.register(Color)
admin.site.register(Talla)
admin.site.register(Marca)
admin.site.register(Loved)
admin.site.register(Categoria,CategoriaAdmin)
admin.site.register(Firme,FirmeAdmin)
