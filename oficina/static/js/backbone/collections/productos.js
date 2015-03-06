Oficina.Collections.Productos = Backbone.Collection.extend({
	model : Oficina.Models.Producto,
	url : '/api/catalogo/',
});