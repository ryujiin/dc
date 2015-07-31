from django.conf import settings

def pago_tienda(request):
	return {
		"stripe_key":settings.STRIPE_PUBLIC_KEY,
	}