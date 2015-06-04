Oficina.Views.Resumen = Backbone.View.extend({
	el:$('#main-oficina .main'),
	template : swig.compile($("#pagina_root_template").html()),
	events: {
	},
	initialize : function () {
	},
	render: function () {
		var html = this.template();
        this.$el.html(html);
	}
});