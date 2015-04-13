Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		'catalogo/:categoria/':'catalogo',
		'producto/:producto/':'producto_single',
		'carro/':'carro',
		'pagar/':'pagar',
		'cliente/cuenta/':'cliente_cuente',
		'cliente/salir/':'salir',
		'*notFound': 'notFound',
	},
	initialize : function () {
  	},
	root : function () {
		window.app.slug='home';
		if (window.views.slider_home===undefined) {
			window.views.slider_home = new Loviz.Views.Sliders_Home({
				collection : window.collections.sliderHome
			});
		}
	},
	catalogo:function(categoria){
		window.app.slug='catalogo';
		if (window.views.catalogo === undefined) {
			window.views.catalogo = new Loviz.Views.Catalogo();
		}
		window.views.catalogo.render(categoria);
	},
	producto_single:function (producto) {
		var modelo = new Loviz.Models.Producto_Single();
		modelo.buscar(producto);
	},
	carro:function () {
		window.app.slug='carro';
		window.views.carro.render();
	},
	pagar:function () {
		window.app.slug='pagar';
		window.views.pagar.render();
	},
	cliente_cuente:function () {
		window.app.slug='cliente';
		window.views.usuario.render();
	},
	salir:function () {
		console.log('salir');
		$.removeCookie('carrito', { path: '/' });
		window.location.href='/ajax/salir/';
	},
	notFound:function () {
		console.log('Estamos en una pagina vacia')
	},

});