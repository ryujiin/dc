Loviz.Views.Galeria_producto_single = Backbone.View.extend({
	
    template: swig.compile($("#producto_single_galeria_template").html()),

	events: {
		'click .thum a' : 'nuevo_galeria',
	},
	initialize : function () {
		var self = this;
		this.$el=$('#producto_galeria');
		this.render();
		this.crear_galeria();
	},
	render:function () {
		var modelo = this.model.toJSON();
		var html = this.template(modelo);
        this.$el.html(html);

	},
	crear_galeria:function () {
		this.$('.imagenes').zoom();
	},
	nuevo_galeria:function (e) {
		e.preventDefault();
		this.$('.imagenes').trigger('zoom.destroy');
		this.$('.imagenes').empty();
		var url = $(e.currentTarget).data('bigimga');
		var img = '<img src="'+url+'" alt="">';
		this.$('.imagenes').html(img);
		this.crear_galeria();
	},
});