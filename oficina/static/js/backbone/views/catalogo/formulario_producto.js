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
		this.rellenar();
	},
	rellenar:function () {
		if (this.model.id===undefined) {
			this.llenar_color();
		}
	},
	llenar_color:function () {
		var v_colores = new Oficina.Views.Colores({
			collection : new Oficina.Collections.Colores()
		});
		this.$('#colores_formulario').append(v_colores.$el);
	}
});