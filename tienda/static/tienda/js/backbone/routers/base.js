Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		'*notFound': 'notFound',
	},
	initialize : function () {
  	},
	root : function () {
		window.views.slider_home = new Loviz.Views.Sliders_Home({
			collection : window.collections.sliderHome
		});
	},
	notFound:function () {
		console.log('Estamos en una pagina vacia')
	},

});