from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.
class OficinaView(TemplateView):
	template_name = "oficina.html"