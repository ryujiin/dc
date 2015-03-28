from django.shortcuts import render
from models import *
from serializers import *
from django.contrib.auth.models import User, Group
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser,IsAuthenticatedOrReadOnly
from rest_framework import authentication, permissions, parsers, renderers
from rest_framework import viewsets, generics
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import api_view, throttle_classes
#from social.apps.django_app.utils import psa

from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from django.contrib.auth import login, authenticate, logout
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.contrib.auth.forms import UserCreationForm


# Create your views here.

class PerfilUserViewSet(APIView):
	permission_classes = (IsAuthenticated,)

	def get(self,request,format=None):
		try:
			perfil = User.objects.get(pk=request.user.pk)
		except User.DoesNotExist:
			raise Http404

		serializer = UsuarioSerializer(perfil)
		return Response(serializer.data)

from rest_framework.permissions import AllowAny
from .permissions import IsStaffOrTargetUser

class UsuarioViewSet(viewsets.ModelViewSet):
	serializer_class = UserSerializer
	queryset = User.objects.all()

	def get_permissions(self):
		return (AllowAny() if self.request.method == 'POST'
			else IsStaffOrTargetUser()),

class ComentarioViewSet(viewsets.ModelViewSet):
	serializer_class = ComentairoSerializer

	def get_queryset(self):
		queryset = Comentario.objects.all().order_by('-pk')
		producto = self.request.QUERY_PARAMS.get('producto', None)
		if producto is not None:
			queryset = Comentario.objects.filter(producto=producto).order_by('-pk')
		return queryset

class DireccionViewsets(viewsets.ModelViewSet):
	serializer_class = DireccionSerilizer
	permission_classes = (IsAuthenticated,)

	def get_queryset(self):
		if self.request.user.is_authenticated():
			queryset = Direccion.objects.filter(usuario=self.request.user)
			return queryset
		
class SuscritoViewset(viewsets.ModelViewSet):
	serializer_class = SuscritoSerializer
	queryset = Suscrito.objects.all()

from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
import json

def ingresar(request):
	if request.method=='POST':
		formulario = AuthenticationForm(request.POST)
		if formulario.is_valid:
			username = request.POST['username']
			clave = request.POST['password']
			acceso = authenticate(username=username,password=clave)
			if acceso is not None:
				if acceso.is_active:
					login(request,acceso)
					return HttpResponse(json.dumps({'id':request.user.id,'nombre':request.user.username,'email':request.user.email}),
							content_type='application/json;charset=utf8')
				else:
					return  HttpResponse(json.dumps({'id':0,'nombre':request.user.username,'email':request.user.email,'error_message':'El usurio esta inactivo'}),
							content_type='application/json;charset=utf8')
			else:
				return HttpResponse(json.dumps({'id':0,'nombre':'anonimo','email':'','error_message':'Ha especificado un email o password incorrecto.'}),
				content_type='application/json;charset=utf8')
		else:
			raise Http404

@login_required(login_url='/ingresar/')
def salir(request):
	logout(request)
	return HttpResponseRedirect('/')