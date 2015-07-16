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
		this.bind('route', this._pageView);
  	},
	root : function () {
		window.app.slug='home';
		window.views.home.render();
		window.views.tienda.cambiando_page();
	},
	catalogo:function(categoria){
		window.app.slug='catalogo';
		if (window.views.catalogo === undefined) {
			window.views.catalogo = new Loviz.Views.Catalogo();
		}
		window.views.catalogo.render(categoria);
		window.views.tienda.cambiando_page();
	},
	producto_single:function (producto) {
		window.app.slug='producto_single';
		var modelo = new Loviz.Models.Producto_Single();
		modelo.buscar(producto);
		window.views.tienda.cambiando_page();
	},
	carro:function () {
		window.app.slug='carro';
		window.views.carro.varificar_numero();
		window.views.tienda.cambiando_page();
	},
	pagar:function () {
		window.app.slug='pagar';
		window.views.pagar.render();
		window.views.tienda.cambiando_page();
	},
	cliente_cuente:function () {
		window.app.slug='cliente';
		window.views.usuario.render();
		window.views.tienda.cambiando_page();
	},
	salir:function () {
		console.log('salir');
		$.removeCookie('carrito', { path: '/' });
		window.location.href='/ajax/salir/';
	},
	notFound:function () {
		console.log('Estamos en una pagina vacia')
	},
	_pageView: function() {
	  var path = Backbone.history.getFragment();
	  ga('send', 'pageview', {page: "/" + path});
	}
});