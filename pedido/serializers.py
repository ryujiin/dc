from rest_framework import serializers
from models import *
from django.conf import settings

class PedidoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Pedido