Loviz.Models.Linea = Backbone.Model.extend({
	urlRoot : '/api/lineas/',
	name : 'Linea',
	url : function() {
		var base = this.urlRoot;
		if (this.isNew()) return base;
		return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id+'/';
	},
	cambiar_carro:function (carro) {
		if (carro) {
			this.set('carro',carro);
			this.save();
		};
	},
	grabando:function (t) {
		this.save().done(function () {
			window.models.carro.fetch().done(function () {
				if (t===true) {
					$('.cargando').fadeOut();
				};
			});
		})
	}
});