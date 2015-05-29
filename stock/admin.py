from django.contrib import admin
from models import *
# Register your models here.
class StockFirmeAdmin(admin.ModelAdmin):
	list_display = ('id','firme','operacion','cantidad','total','fecha')

admin.site.register(StockFirme,StockFirmeAdmin)