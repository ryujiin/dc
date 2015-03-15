Oficina.Views.Colores = Backbone.View.extend({
	tagName: 'select',
	className : 'form-control color_producto',
	template : swig.compile($("#formu_select_template").html()),
	events: {
	},
	initialize : function () {
		var self=this;
		this.collection.fetch().done(function () {
			self.render();
		})
	},
	render: function () {
		this.$el.append("<option>Selecciona un Color</option>");
		this.collection.forEach(this.add_color,this);
	},
	add_color:function (modelo) {
		var option = "<option data-name="+modelo.toJSON().nombre+" value="+modelo.toJSON().id+">"+modelo.toJSON().nombre+"</option>";
		this.$el.append(option);
	},

});