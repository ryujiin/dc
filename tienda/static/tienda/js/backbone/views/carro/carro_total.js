Loviz.Views.Carro_tatal = Backbone.View.extend({
	tagName:'table',
	className:'table',
	template : swig.compile($("#carro_total_template").html()),
	events: {
	},
	initialize : function () {
        this.listenTo(this.model, "change", this.render, this);
		this.render();
	},
	render:function () {
		var carro = this.model.toJSON()
	    var html = this.template(carro);
	    this.$el.html(html);
	},
});