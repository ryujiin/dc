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
			this.fetch().done(function () {
        		self.pedido_carro();
			})
		};
	},
	pedido_carro:function () {
		if (this.length>0) {
			var pedido = window.models.carro.toJSON().pedido;
			if (pedido!==null) {
				window.models.pedido=this.findWhere({id:pedido});
			};
		};

	}
});