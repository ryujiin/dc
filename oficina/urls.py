from django.conf.urls import patterns, include, url
from views import *

urlpatterns = patterns('',
	url(r'^$',OficinaView.as_view() , name='oficina'),
	url(r'^catalogo/',OficinaView.as_view() , name='catalogo'),
	url(r'^add_producto/',OficinaView.as_view() , name='catalogo'),
)