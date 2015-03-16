from django.conf.urls import patterns, include, url

from django.contrib import admin
from django.conf import settings

from catalogo import views
from tienda import views as TiendaViews

from rest_framework.routers import DefaultRouter
#Creando rutas
router = DefaultRouter()
router.register(r'catalogo', views.CatalogoViewsets,'catalogo')
router.register(r'producto', views.ProductoViewsets,'producto')
router.register(r'color', views.ColorViewsets,'Color')
router.register(r'tienda/sliderhome', TiendaViews.SliderHomeViewsets,'sliderhome')

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'django_project.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^api/', include(router.urls)),
    url(r'^oficina/',include('oficina.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^',include('tienda.urls')),    
)
if settings.DEBUG:
    urlpatterns = patterns('',
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
) + urlpatterns