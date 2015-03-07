Oficina.Views.Catalogo = Backbone.View.extend({
	el:$('#main'),
	template : swig.compile($("#catalogo_template").html()),
	events: {
		'click .acciones .add_producto' : 'ir_nuevo_producto',
	},
	initialize : function () {
		var self = this;
	},
	render: function () {
		var html = this.template();
		this.$el.html(html);
		this.listar_productos();
	},
	listar_productos:function () {
		var self = this;
		var coleccion = this.collection;
		coleccion.fetch().done(function () {
			coleccion.forEach(self.addProductoLista,self);
		})
	},
	addProductoLista:function (produ) {
		var producto = new Oficina.Views.Producto_lista({ model: produ });
		this.$('#lista_productos').append(producto.render().el);
	},
	ir_nuevo_producto:function () {
		window.routers.base.navigate('/oficina/add_producto/', {trigger:true});		
	}
});