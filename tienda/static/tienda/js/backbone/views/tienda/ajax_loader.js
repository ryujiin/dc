Loviz.Views.Ajax_loader = Backbone.View.extend({
	template : swig.compile($("#caja_ajax_template").html()),
	events: {
	},
	initialize : function () {
		this.render();
	},
	render:function () {
        var html = this.template();
        this.$el.html(html);
        this.$el.addClass('ajax_caja');
	}
});
