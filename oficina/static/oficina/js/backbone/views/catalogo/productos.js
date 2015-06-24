Oficina.Views.Productos = Backbone.View.extend({
	events: {	
	},
	initialize : function () {
        this.listenTo(this.collection, "add", this.nuevo_producto, this);
	},
	render: function () {
	    this.collection.forEach(this.nuevo_producto, this);
	},
	nuevo_producto:function (modelo) {
		var producto = new Oficina.Views.Producto_lista({
			model:modelo
		});
		this.$el.append(producto.render().el);
	}
});