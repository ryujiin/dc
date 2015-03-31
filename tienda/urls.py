from django.conf.urls import patterns, include, url
from views import *

urlpatterns = patterns('',
	url(r'^$',TiendaView.as_view() , name='index'),
	url(r'^catalogo/',TiendaView.as_view() , name='catalogo'),
	url(r'^producto/',TiendaView.as_view() , name='producto_single'),
	url(r'^carro/',TiendaView.as_view() , name='carro'),
)