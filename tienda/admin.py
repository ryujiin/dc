from django.contrib import admin
from models import *
# Register your models here.
class SliderHomeAdmin(admin.ModelAdmin):
	list_display = ('id','titulo','link','activo')

admin.site.register(SliderHome,SliderHomeAdmin)
