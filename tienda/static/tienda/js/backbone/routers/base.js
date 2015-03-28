Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		'catalogo/:categoria/':'catalogo',
		'producto/:producto/':'producto_single',
		'*notFound': 'notFound',
	},
	initialize : function () {
  	},
	root : function () {
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
	notFound:function () {
		console.log('Estamos en una pagina vacia')
	},

});