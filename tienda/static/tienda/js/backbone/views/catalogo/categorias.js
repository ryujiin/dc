Loviz.Views.Categorias = Backbone.View.extend({
	
    template: swig.compile($("#bloque_refinamiento_template").html()),

	events: {
	},
	initialize : function () {
		this.$el = $('#categorias');
		this.render();
	},
	render:function () {
		var datos = this.model.toJSON();
		var html = this.template(datos);
        this.$el.html(html);
        this.rellenar();
	},
	rellenar:function () {
		var categorias = window.collections.categorias.where({padre:this.model.toJSON().slug});
		categorias.forEach(this.add_link,this);
	},
	add_link:function (link) {
		var vista = new Loviz.Views.Categoria_link({model:link});
		this.$('.links').append(vista.render().el);
	}

});