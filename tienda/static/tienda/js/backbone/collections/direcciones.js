Loviz.Collections.Direcciones = Backbone.Collection.extend({
	model : Loviz.Models.Direccion,
	url : '/api/cliente/direcciones/',
	name : 'Direcciones',
	initialize:function () {
        this.listenTo(window.models.usuario, "change", this.buscar, this);
	},
	buscar:function () {
		this.fetch();
	}
});