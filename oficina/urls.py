from django.conf.urls import patterns, include, url
from views import *

urlpatterns = patterns('',
	url(r'^$',my_oficina , name='oficina'),
	url(r'^catalogo/',my_oficina , name='catalogo'),
	url(r'^materiales/',my_oficina , name='materiales'),
	
)