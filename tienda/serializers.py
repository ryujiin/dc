from rest_framework import serializers
from models import *

class SliderHomeSerializer(serializers.ModelSerializer):
	class Meta:
		model=SliderHome
