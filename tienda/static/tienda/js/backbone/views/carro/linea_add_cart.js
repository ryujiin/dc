Loviz.Views.Linea_addcart = Backbone.View.extend({
	el:$('#linea_addcart'),
	template : swig.compile($("#linea_addcart_template").html()),
	events: {
		'click .link':'cerrar_modal',
	},
	initialize : function () {
	    this.listenTo(this.model, "change", this.verificar_datos, this);
	},
	render:function () {
		var carro = this.model.toJSON()
	    var html = this.template(carro);
	    this.$el.html(html);
	    this.$el.modal();
	},
	cerrar_modal:function () {
		this.$el.modal('hide');
	},
	verificar_datos:function () {
		if (this.model.toJSON().id!==undefined) {
			this.render();
		};
	}
});