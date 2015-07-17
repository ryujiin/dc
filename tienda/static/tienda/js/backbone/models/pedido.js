Loviz.Models.Pedido = Backbone.Model.extend({
	urlRoot : '/api/pedidos/',
	url : function() {
        var base = this.urlRoot;
        if (this.isNew()) return base;
        return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id+'/';
    },
	initialize:function () {
		//this.listenTo(window.models.carro, "change", this.buscar_pedido, this);
	},
	buscar_pedido:function () {
		debugger;
		if (window.models.carro.id!==undefined) {
			if (window.models.carro.toJSON().pedido!==null) {
				this.id = window.models.carro.toJSON().pedido;
				this.fetch().done(function (data) {
					debugger;
				});
				debugger;
			}else{
				debugger;
				this.creando_pedido();
			}
		};
		debugger;
	},
	creando_pedido:function () {
		var estado = window.collections.estados_pedidos.findWhere({slug_estado:'inicio'})
		this.set({gasto_envio:0,carro:window.models.carro.id,estado:estado.id,numero_pedido:''});
		this.save().done(function (data) {
			window.models.carro.set({pedido:data.id})
			window.models.carro.save();
			debugger;
		});
		debugger;
	}
});