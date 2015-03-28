Loviz.Collections.Favoritos = Backbone.Collection.extend({
	model : Loviz.Models.Favorito,
	url : '/api/favoritos/',
	initialize:function () {
	    this.listenTo(window.models.usuario, "change", this.buscar, this);
	},
	buscar:function () {
		if (window.models.usuario.id !==undefined) {
			this.fetch();
		};
	},
});