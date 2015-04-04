Loviz.Views.Linea_addcart = Backbone.View.extend({
	el:$('#linea_addcart'),
	template : swig.compile($("#linea_addcart_template").html()),
	events: {
		'click .link':'cerrar_modal',
	},
	initialize : function () {
		this.render();
	},
	render:function () {
		var carro = this.model.toJSON()
	    var html = this.template(carro);
	    this.$el.html(html);
	    this.$el.modal();
	},
	cerrar_modal:function () {
		this.$el.modal('hide');
	}
});