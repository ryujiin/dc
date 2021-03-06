from django.conf.urls import patterns, include, url

from django.contrib import admin
from django.conf import settings

from catalogo import views
from tienda import views as TiendaViews
from cesta.views import LineasViewsets
from ubigeo.views import RegionViewset
from cliente import views as ClienteViewsets
from pedido.views import PedidoViewSet,MetodoEnvioViewSet,EstadosPedidosViewSet

from rest_framework.routers import DefaultRouter
#Creando rutas
router = DefaultRouter()
router.register(r'catalogo', views.CatalogoViewsets,'catalogo')
router.register(r'categoria', views.CategoriaViewsets,'categorias')
router.register(r'materiales/firme', views.FirmeViewSet,'firme')
router.register(r'favoritos', views.LovedViewsets,'favoritos')
router.register(r'lineas',LineasViewsets,'lineas')
router.register(r'producto', views.Producto_singleViewsets,'producto')
router.register(r'color', views.ColorViewsets,'Color')
router.register(r'tienda/sliderhome', TiendaViews.SliderHomeViewsets,'sliderhome')
router.register(r'cliente/direcciones', ClienteViewsets.DireccionViewsets,'Direcciones')
#router.register(r'cliente/usuario', ClienteViewsets.UsuarioViewSet,'usuario')
router.register(r'comentarios', ClienteViewsets.ComentarioViewSet,'comentarios')
router.register(r'pedidos', PedidoViewSet,'Pedido')
router.register(r'estados_pedido', EstadosPedidosViewSet,'Estados_pedido')
router.register(r'envio', MetodoEnvioViewSet,'metodo_envio')
router.register(r'ubigeo', RegionViewset,'ubigeo')

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'django_project.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^api/cliente/', include('cliente.urls')),    
    url(r'^api/carro/', include('cesta.urls')),
    url(r'^api/', include(router.urls)),
    url(r'^oficina/',include('oficina.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^ajax/login/', 'cliente.views.ingresar', name='ingresar_ajax'),
    url(r'^ajax/crear/', 'cliente.views.nuevo_usuario', name='nuevo_usuario'),    
    url(r'^ajax/salir/', 'cliente.views.salir', name='salir'),
    url(r'^api/productoSingle/$',views.Producto_singleView.as_view()),
    url(r'^pago/stripe/', 'pago.views.stripe_paymet', name='pago_stripe'),
     url('', include('social.apps.django_app.urls',namespace="social")),
    url(r'^',include('tienda.urls')),    
)
if settings.DEBUG:
    urlpatterns = patterns('',
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
) + urlpatterns