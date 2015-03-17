Loviz.Collections.Productos = Backbone.Collection.extend({
	model : Loviz.Models.Producto,
	url : '/api/catalogo/',
	
	initialize:function () {
	},
	buscar_productos:function (cate) {
		this.fetch({
			data:$.param({categoria:cate})
		});
	}
});