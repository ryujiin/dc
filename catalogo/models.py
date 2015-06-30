from django.db import models
from django.template.defaultfilters import slugify

from sorl.thumbnail import get_thumbnail
from django.contrib.auth.models import User as User

# Create your models here.
class Producto(models.Model):
	nombre = models.CharField(max_length=120,blank=True,null=True)
	full_name = models.CharField(max_length=120, unique=True,blank=True,null=True,editable=False)
	marca = models.ForeignKey('Marca',blank=True,null=True)
	slug = models.CharField(max_length=120,editable=False,unique=True)
	color = models.ForeignKey('Color',blank=True,null=True)
	parientes = models.ManyToManyField('self',blank=True,null=True, related_name='colores')
	categorias = models.ManyToManyField('Categoria',blank=True,null=True,related_name='categorias_producto')
	activo = models.BooleanField(default=True)
	descripcion = models.TextField(blank=True,null=True)
	detalles = models.TextField(blank=True,null=True)
	creado = models.DateTimeField(auto_now_add=True)
	video = models.CharField(max_length=120, blank=True,null=True)

	def __unicode__(self):
		return self.full_name

	def save(self, *args, **kwargs):
		self.full_name = "%s (%s), %s" %(self.nombre,self.color,self.marca)
		if not self.slug:
			self.slug = slugify(self.full_name)
		super(Producto, self).save(*args, **kwargs)

	def get_thum(self):
		img = ProductoImagen.objects.get(producto=self,orden=0)
		img = get_thumbnail(img.foto, '450x350', quality=80)
		return img

	def get_en_oferta(self):
		variaciones = self.get_variaciones()
		for varia in variaciones:
			if varia.oferta != 0:
				return True
		return False

	def get_variaciones(self):
		variaciones = ProductoVariacion.objects.filter(producto=self).order_by('-oferta')
		return variaciones

	def get_precio_lista(self):
		en_oferta = self.get_en_oferta()
		if en_oferta:
			variaciones=self.get_variaciones()
		else:
			variaciones = ProductoVariacion.objects.filter(producto=self).order_by('-precio_minorista')
		if variaciones:
			precio = variaciones[0].precio_minorista
		else:
			precio = 0
		if not precio:
			precio = 0
		precio = "%0.2f" %(precio)		
		return precio

	def get_precio_oferta_lista(self):
		en_oferta = self.get_en_oferta()
		if en_oferta:
			variaciones=self.get_variaciones()
			precio = variaciones[0].precio_minorista
			oferta = variaciones[0].oferta
			descuento= precio*oferta/100
			precio = precio - descuento
			precio = "%0.2f" %(precio)
			return precio
		else:
			precio = self.get_precio_lista()
			return precio

	def get_parientes(self):
		parientes = self.parientes.all()
		return parientes

	def get_num_estrellas(self):
		num_entrellas = Comentario.objects.filter(producto=self)
		return num_entrellas

class Color(models.Model):
	nombre = models.CharField(max_length=100)
	slug = models.SlugField(max_length=120,unique=True,editable=False,blank=True,null=True)

	def __unicode__(self):
		return self.nombre

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = slugify(self.nombre)
		super(Color, self).save(*args, **kwargs)

class Talla(models.Model):
	nombre = models.CharField(max_length=100)
	slug = models.SlugField(max_length=120,unique=True,editable=False,blank=True,null=True)

	def __unicode__(self):
		return self.nombre

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = slugify(self.nombre)
		super(Talla, self).save(*args, **kwargs)

class Categoria(models.Model):
	SECCIONES = (
		('genero','Genero'),
		('categoria','Categoria'),
		('estilo','Estilo'),
	)
	nombre = models.CharField(max_length=120)
	full_name = models.CharField(max_length=255,db_index=True, editable=False)
	padre = models.ForeignKey('self',blank=True,null=True)
	seccion = models.CharField(max_length=100,choices=SECCIONES,blank=True,null=True)
	slug = models.SlugField(max_length=120,unique=True,editable=False)
	descripcion = models.TextField(blank=True,null=True)
	activo = models.BooleanField(default=True)
	imagen = models.ImageField(upload_to='categorias',blank=True,null=True,max_length=250)
	
	def __unicode__(self):
		return self.slug

	def save(self, *args, **kwargs):
		if self.padre:
			self.full_name = "%s - %s" %(self.padre.full_name,self.nombre)
		else:
			self.full_name = self.nombre
		if not self.slug:
			self.slug = slugify(self.full_name)
		super(Categoria, self).save(*args, **kwargs)


class ProductoVariacion(models.Model):
	producto = models.ForeignKey(Producto,related_name='variaciones')
	talla = models.ForeignKey(Talla)
	precio_minorista = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
	oferta = models.PositiveIntegerField(default=0)

	def __unicode__(self):
		return "%s-%s" %(self.producto,self.precio_minorista)

	def get_precio_venta(self):
		descuento= self.precio_minorista*self.oferta/100
		precio = self.precio_minorista - descuento
		return precio

def url_imagen_pr(self,filename):
	url = "productos/imagen/%s/%s" % (self.producto.pk, filename)
	return url

class ProductoImagen(models.Model):
	producto = models.ForeignKey(Producto,related_name="imagenes_producto")
	foto = models.ImageField(upload_to=url_imagen_pr)
	orden = models.PositiveIntegerField(default=0)
	creado = models.DateTimeField(auto_now_add=True)
	actualizado = models.DateTimeField(auto_now=True)
	class Meta:
		ordering = ["orden"]

	def get_thum_medium(self):
		img = get_thumbnail(self.foto, '740x600', quality=80)
		return img

	def get_thum(self):
		img = get_thumbnail(self.foto, '150x100', quality=80)
		return img

class Marca(models.Model):
	nombre = models.CharField(max_length=100)

	def __unicode__(self):
		return self.nombre

class Loved(models.Model):
	usuario = models.ForeignKey(User,null=True,blank=True,unique=True)
	producto = models.ForeignKey('Producto',blank=True,null=True,related_name='favoritos')

class Firme(models.Model):
	MODELOS = (
		('scuff-01','Scuff 01'),
		('scuff-H-01','Scuff Hombre 01'),
	)
	modelo = models.CharField(max_length=100,choices=MODELOS,blank=True,null=True)
	talla = models.ForeignKey(Talla)
	color = models.ForeignKey(Color)

	def __unicode__(self):
		return "%s - %s" %(self.color,self.talla)