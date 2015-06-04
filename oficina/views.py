from django.shortcuts import render_to_response
from django.contrib.auth.decorators import user_passes_test

@user_passes_test(lambda u:u.is_staff, login_url='/admin/')
def my_oficina(request):
	return render_to_response('oficina.html')
