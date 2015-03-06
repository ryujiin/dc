Oficina.Routers.Base = Backbone.Router.extend({
	routes : {
		"oficina/" : "root",
		"oficina/catalogo/" : "catalogo",
		"oficina/catalogo/add_producto/" : "nuevo_producto",
		'*notFound': 'notFound',
	},
	initialize : function () {
  	},
	root : function () {
		window.app.oficina = 'resumen'
		window.views.pagina.activarlo();

	},
	catalogo:function () {
		window.app.oficina = 'catalogo',
		window.views.pagina.activarlo();
		if (window.views.catalogo===undefined) {
			window.views.catalogo = new Oficina.Views.Catalogo({
				collection:window.collections.productos_lista
			});
		}
		window.views.catalogo.render();
	},
	notFound:function () {
		console.log('no hay pagina')
	},

});