Oficina.Views.Firmes = Backbone.View.extend({
	events: {	
	},
	initialize : function () {
        this.listenTo(this.collection, "add", this.addOne, this);
	},
	render: function () {
	    this.collection.forEach(this.addOne, this);
	},
	addOne:function (modelo) {
		var firme = new Oficina.Views.Firme_lista({
			model:modelo
		});
		this.$el.append(firme.render().el);
	}
});