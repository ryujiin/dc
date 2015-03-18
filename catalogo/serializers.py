from rest_framework import serializers
from models import *

class ProductoListaSerializer(serializers.ModelSerializer):
	marca = serializers.CharField(read_only=True)
	color = serializers.CharField(read_only=True)
	thum = serializers.SerializerMethodField()
	precio = serializers.SerializerMethodField()
	precio_venta = serializers.SerializerMethodField()
	en_oferta = serializers.SerializerMethodField()
	estilo = serializers.SerializerMethodField()
	cate = serializers.SerializerMethodField()
	genero = serializers.SerializerMethodField()
	class Meta:
		model=Producto
		fields=('id','nombre','full_name','slug','marca','color','categorias','thum','precio','precio_venta','en_oferta','activo','cate','estilo','genero')

	def get_thum(self,obj):
		imagen = obj.get_thum()
		return imagen.url

	def get_precio(self,obj):
		return obj.get_precio_lista()

	def get_precio_venta(self,obj):
		return obj.get_precio_oferta_lista()

	def get_en_oferta(self,obj):
		return obj.get_en_oferta()

	def get_cate(self,obj):
		cate = obj.obtener_categorias()
		return cate

	def get_estilo(self,obj):
		estilo = obj.get_estilo()
		return estilo

	def get_genero(self,obj):
		genero = obj.get_genero()
		return genero

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