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
		this.add_productos();
		this.add_firmes();
	},
	add_productos: function () {
		var productos = new Oficina.Collections.Productos();
		var vista_productos = new Oficina.Views.Productos({
			el:this.$('.lista_productos'),
			collection:productos,
		});
		productos.fetch();
	},
	add_firmes:function () {
		var firmes = new Oficina.Collections.Firmes();
		
	},
});