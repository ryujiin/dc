from django.shortcuts import render

from rest_framework import viewsets

from django.http import HttpResponse, Http404
from serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status



from models import *

class PedidoViewsApi(APIView):
	def get_object(self):
		try:
			return Pedido.objects.all()
		except Pedido,DoesNotExist:
			raise Http404

		#if self.request.user.is_authenticated():
			#try:
				#return Carro.objects.get(propietario=self.request.user,estado="Abierto")
			#except Carro.DoesNotExist:
				#raise Http404
		#else:
			#coockie_carro = self.request.GET.get('session')
			#try:
				#return Carro.objects.get(sesion_carro=coockie_carro,estado="Abierto")
			#except Carro.DoesNotExist:
				#raise Http404


	def get(self,request,format=None):
		pedido = Pedido.objects.all()
		serializer = PedidoSerializer(pedido)
		return Response(serializer.data,status=status.HTTP_200_OK)
		
	def post(self, request, format=None):
		serializer = PedidoSerializer(data=request.DATA)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	

class PedidoDetailViews(APIView):
	def get_object(self,pk):
		try:
			return Pedido.objects.get(pk=pk)
		except Carro.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		pedido = self.get_object(pk)
		serializer = PedidoSerializer(pedido)
		return Response(serializer.data)

	def put(self, request, pk, format=None):
		pedido = self.get_object(pk)
		serializer = PedidoSerializer(pedido,data=request.DATA)
		if serializer.is_valid():
			serializer.save()
			return Response (serializer.data)
		return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class PedidoViewSet(viewsets.ViewSet):
	def list(self,request):
		if request.user.is_authenticated:
			print request.user.pk
			queryset = Pedido.objects.filter(user=request.user.pk)
		serializer = PedidoSerializer(queryset, many=True)
		return Response(serializer.data)
