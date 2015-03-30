Loviz.Views.Mini_carro = Backbone.View.extend({
	el:$('#mini_carro'),
	template : swig.compile($("#mini_carro_template").html()),
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
	}
});