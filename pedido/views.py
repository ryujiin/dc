from django.shortcuts import render

from rest_framework import viewsets

from django.http import HttpResponse, Http404
from serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from models import * 

class PedidoViewSet(viewsets.ViewSet):
	def list(self,request):
		if request.user.is_authenticated:
			queryset = Pedido.objects.filter(user=request.user.pk)
		serializer = PedidoSerializer(queryset, many=True)
		return Response(serializer.data)

	def create(self,request):
		if request.user.is_authenticated:
			request.DATA['user']=request.user.pk
		serializer = PedidoSerializer(data=request.DATA)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def retrieve(self, request, pk=None):
		queryset = Pedido.objects.all()
		pedido = get_object_or_404(queryset, pk=pk)
		serializer = PedidoSerializer(pedido)
		return Response(serializer.data)

class MetodoEnvioViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = MetodoEnvio.objects.all()
	serializer_class = MetodoEnvioSerializer