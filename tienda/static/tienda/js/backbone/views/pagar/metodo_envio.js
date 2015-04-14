Loviz.Views.Metodo_Envio = Backbone.View.extend({
    className:'radio',
    template: swig.compile($("#metodo_envio_template").html()),
	events: {

    },
    initialize: function () {
    	this.render();
    },
    render: function () {
    	var datos = this.model.toJSON()
		var html = this.template(datos);
        this.$el.html(html);
    },
});