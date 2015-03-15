Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		'*notFound': 'notFound',
	},
	initialize : function () {
  	},
	root : function () {
		console.log('estamos en el root')
	},
	notFound:function () {
		console.log('Estamos en una pagina vacia')
	},

});