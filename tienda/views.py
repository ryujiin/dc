from django.shortcuts import render
from django.views.generic import TemplateView

from models import *
from serializers import *

# Create your views here.
class TiendaView(TemplateView):
	template_name = "index.html"

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
from rest_framework import viewsets

class SliderHomeViewsets(viewsets.ReadOnlyModelViewSet):
	serializer_class = SliderHomeSerializer
	queryset = SliderHome.objects.all()
