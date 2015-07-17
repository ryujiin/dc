Loviz.Collections.Pedidos = Backbone.Collection.extend({
	model : Loviz.Models.Pedido,
	url : '/api/pedidos/',
	name : 'Pedidos',
	initialize:function () {
        this.listenTo(window.models.usuario, "change", this.buscar, this);
	},
	buscar:function () {
		var self = this;
		if (window.models.usuario.id!==undefined) {
			this.fetch();
		};
	},
});