Loviz.Collections.Pedidos = Backbone.Collection.extend({
	model : Loviz.Models.Pedido,
	url : '/api/pedidos/',
	name : 'Pedidos',
	initialize:function () {
        this.listenTo(window.models.usuario, "change", this.buscar, this);
        this.listenTo(window.models.carro, "change:pedido", this.buscar, this);
	},
	buscar:function () {
		var self = this;
		if (window.models.usuario.id!==undefined) {
			this.fetch().done(function () {
				self.forEach(self.pedido_actual,self);
			});
		};
	},
	pedido_actual:function (modelo) {
		if (window.models.carro.toJSON().pedido===modelo.id) {
			window.models.pedido.set(modelo.toJSON());
		};
	},
});