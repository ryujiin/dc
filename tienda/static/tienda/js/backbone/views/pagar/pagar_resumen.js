Loviz.Views.Resumen_pagar = Backbone.View.extend({
	events: {
    },
    initialize: function () {
    	this.render();
        this.listenTo(window.views.pagar.model, "change", this.aparecer, this);    	
    },
    render: function () {
    	var datos = this.model.toJSON()
		var html = this.template(datos);
        this.$el.html(html);
    },
});