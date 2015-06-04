Oficina.Routers.Rutas = Backbone.Router.extend({
	routes : {
		"oficina/" : "root",
		"oficina/catalogo/" : "catalogo",
		"oficina/add_producto/" : "nuevo_producto",
		'*notFound': 'notFound',
	},
	initialize : function () {
  	},
	root : function () {
		console.log('oficna');
		window.views.resumen.render();
	},
	catalogo:function () {
		console.log('catalogo');
		window.views.catalogo.render();		
	},
	notFound:function () {
		console.log('no hay pagina')
	},

});