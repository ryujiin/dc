Loviz.Models.Producto_Single = Backbone.Model.extend({
	urlRoot : '/api/productoSingle/',
	buscar :function (slug) {
		var self = this;
		if (window.views.producto_single.model.toJSON().slug===slug) {
			window.views.producto_single.render();
		}else{
			this.fetch({
				data:$.param({slug:slug})
			}).done(function (data) {
				window.views.producto_single.model.set(data)
				window.collections.producto_single.add(self)
			})	
		}		
	}
});