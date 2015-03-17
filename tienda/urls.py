from django.conf.urls import patterns, include, url
from views import *

urlpatterns = patterns('',
	url(r'^$',TiendaView.as_view() , name='index'),
	url(r'^catalogo/',TiendaView.as_view() , name='catalogo'),
)