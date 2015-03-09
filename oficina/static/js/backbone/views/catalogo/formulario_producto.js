Oficina.Views.Formulario_producto = Backbone.View.extend({
	el:$('#main'),
	template : swig.compile($("#formulario_producto_template").html()),
	events: {
		'submit .add_color_formulario': 'add_color',
		'click .guardar_nuevo_color': 'add_color',
		'keyup #nombre_producto' : 'escribe_nombre',
		'change .color_producto' : 'escribe_color',
		'change .marca_producto' : 'escribe_marca',
		'click .verificar_salvar':'verificar_salvar',
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
	add_color:function (e) {
		var self = this;
		e.preventDefault();
		var nuevo_color = new Oficina.Models.Color();
		var nuevo_nombre = this.$('#nuevo_color').val();
		nuevo_color.set({nombre:nuevo_nombre});
		nuevo_color.save().done(function (data) {
			self.$('#add_color_formulario').modal('hide');
			var option = "<option value='"+data.id+"' selected>"+data.nombre+"</option>";
			self.$('#colores_formulario select').append(option);
		}).fail(function () {
			self.$('#add_color_formulario .help_text').append('<p class="text-danger">Ocurrio un error</p>');
			self.$('#nuevo_color').val('');
		})
	},
	escribe_nombre:function(){
		var texto = $('#nombre_producto').val();
		this.$('#full_name .nombre').html(texto);
	},
	escribe_color:function () {
		var texto = this.$('.color_producto').val();
		texto = parseInt(texto)
		var modelo = this.colores_coleccion.findWhere({'id':texto})
		this.$('#full_name .color').html(' ('+modelo.toJSON().nombre+') ');
	},
	escribe_marca:function () {
		var texto = $('.marca_producto').val();
		this.$('#full_name .marca').html(texto);
	},
	verificar_salvar:function () {
		var nombre = $('#nombre_producto').val();
		var color = $('.color_producto').val();
		var marca = $('.marca_producto').val();
		if (nombre!=='') {
			if (color!=='') {
				if (marca!=='') {
					
				};
			};
		};
	},
	llenar_color:function () {
		this.$('#colores_formulario').empty();
		this.colores_coleccion = new Oficina.Collections.Colores();
		var v_colores = new Oficina.Views.Colores({
			collection :this.colores_coleccion
		});
		this.$('#colores_formulario').append(v_colores.$el);
	}
});