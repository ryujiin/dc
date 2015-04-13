from django.conf.urls import patterns, include, url
from views import *

urlpatterns = patterns('',
	url(r'^$',PedidoViewsApi.as_view()),
	url(r'^(?P<pk>[0-9]+)/$',PedidoDetailViews.as_view()),
)