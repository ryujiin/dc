from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.
class TiendaView(TemplateView):
	template_name = "tienda.html"