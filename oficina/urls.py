from django.conf.urls import patterns, include, url
from views import *

urlpatterns = patterns('',
	url(r'^$',OficinaView.as_view() , name='oficina'),
)