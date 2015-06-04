Oficina.Views.Catalogo = Backbone.View.extend({
	el:$('#main-oficina .main'),
	template : swig.compile($("#catalogo_template").html()),
	events: {
	
	},
	initialize : function () {
		var self = this;
	},
	render: function () {
		var html = this.template();
		this.$el.html(html);
		this.add_lista_productos();
	},
	add_lista_productos:function () {
		var self = this;
		var productos = new Oficina.Collections.Productos();
		productos.fetch().done(function () {
			productos.forEach(self.add_producto,self);
		})
	},
	add_producto:function (modelo) {
		var producto = new Oficina.Views.Producto_lista({model:modelo});
		producto.render();
		this.$('.lista_productos').append(producto.$el);
	}
});