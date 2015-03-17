Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		'catalogo/:categoria/':'catalogo',
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
		if (window.views.catalogo === undefined) {
			window.views.catalogo = new Loviz.Views.Catalogo();
		}
		window.views.catalogo.render(categoria);
	},
	notFound:function () {
		console.log('Estamos en una pagina vacia')
	},

});