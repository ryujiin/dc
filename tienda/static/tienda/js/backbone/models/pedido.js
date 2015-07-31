Loviz.Models.Pedido = Backbone.Model.extend({
	urlRoot : '/api/pedidos/',
	url : function() {
        var base = this.urlRoot;
        if (this.isNew()) return base;
        return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id+'/';
    },
	initialize:function () {
	},
});