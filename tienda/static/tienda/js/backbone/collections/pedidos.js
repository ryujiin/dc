Loviz.Collections.Pedidos = Backbone.Collection.extend({
	model : Loviz.Models.Pedido,
	url : '/api/pedidos/',
	name : 'Pedidos',
});