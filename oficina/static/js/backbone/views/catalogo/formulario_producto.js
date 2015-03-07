Oficina.Views.Formulario_producto = Backbone.View.extend({
	el:$('#main'),
	template : swig.compile($("#formulario_producto_template").html()),
	events: {
	},
	initialize : function () {
		var self = this;
		this.render();
	},
	render: function () {
		var html = this.template();
		this.$el.html(html);	
	},
});