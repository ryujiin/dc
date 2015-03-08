Oficina.Views.Formulario_producto = Backbone.View.extend({
	el:$('#main'),
	template : swig.compile($("#formulario_producto_template").html()),
	events: {
		'click .guardar_nuevo_color': 'add_color',
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
	add_color:function () {
		var nuevo_color = new Oficina.Models.Color();
		var nuevo_nombre = this.$('#nuevo_color').val();
		nuevo_color.set({nombre:nuevo_nombre});
		nuevo_color.save();
		this.$('#add_color_formulario').modal('hide')
	},
	llenar_color:function () {
		this.$('#colores_formulario').empty();
		var v_colores = new Oficina.Views.Colores({
			collection : new Oficina.Collections.Colores()
		});
		this.$('#colores_formulario').append(v_colores.$el);
	}
});