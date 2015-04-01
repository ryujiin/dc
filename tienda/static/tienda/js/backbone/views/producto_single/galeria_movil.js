Loviz.Views.Galeria_movil = Backbone.View.extend({
	
    template: swig.compile($("#galeria_movil_template").html()),

	events: {
		'click .thum a' : 'nuevo_galeria',
	},
	initialize : function () {
		var self = this;
		this.$el=$('#producto_galeria_movil');
		this.render();
		this.crear_galeria();
	},
	render:function () {
		var modelo = this.model.toJSON();
		var html = this.template(modelo);
        this.$el.html(html);

	},
	crear_galeria:function () {
		this.$el.owlCarousel({
		    slideSpeed : 300,
		    paginationSpeed : 400,
		    singleItem:true
		})
	},
});