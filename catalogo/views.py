from django.shortcuts import render

from models import *
from serializers import *
from rest_framework.permissions import IsAuthenticated,IsAdminUser

from django.http import HttpResponse, Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
from rest_framework import viewsets

class CatalogoViewsets(viewsets.ReadOnlyModelViewSet):
	serializer_class = ProductoListaSerializer
	queryset = Producto.objects.all()