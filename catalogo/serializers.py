from rest_framework import serializers
from models import *

class ProductoListaSerializer(serializers.ModelSerializer):
	marca = serializers.CharField(read_only=True)
	color = serializers.CharField(read_only=True)
	thum = serializers.SerializerMethodField()
	precio = serializers.SerializerMethodField()
	precio_venta = serializers.SerializerMethodField()
	en_oferta = serializers.SerializerMethodField()
	class Meta:
		model=Producto
		fields=('id','nombre','full_name','slug','marca','color','categorias','thum','precio','precio_venta','en_oferta','activo')

	def get_thum(self,obj):
		imagen = obj.get_thum()
		return imagen.url

	def get_precio(self,obj):
		return obj.get_precio_lista()

	def get_precio_venta(self,obj):
		return obj.get_precio_oferta_lista()

	def get_en_oferta(self,obj):
		return obj.get_en_oferta()

class ProductoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Producto

class ColorSerializer(serializers.ModelSerializer):
	class Meta:
		model = Color

class CategoriaSerializer(serializers.ModelSerializer):
	padre = serializers.CharField(read_only=True)
	class Meta:
		model = Categoria
		fields = ('id','nombre','full_name','seccion','slug','descripcion','activo','imagen','padre')