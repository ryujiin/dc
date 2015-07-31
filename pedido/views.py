from django.shortcuts import render

from rest_framework import viewsets

from django.http import HttpResponse, Http404
from serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from models import * 

class PedidoViewSet(viewsets.ModelViewSet):
	serializer_class = PedidoSerializer

	def get_queryset(self):
		queryset = Pedido.objects.all()
		if self.request.user.is_authenticated:
			queryset = Pedido.objects.filter(user=self.request.user.pk)
		return queryset

class MetodoEnvioViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = MetodoEnvio.objects.all()
	serializer_class = MetodoEnvioSerializer

class EstadosPedidosViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = EstadoPedido.objects.all()
	serializer_class = EstadoPedidoSerializer