Loviz.Models.Usuario = Backbone.Model.extend({
	url:'/api/cliente/perfil/',
	name:'perfil',
	initialize:function () {
		this.buscar_usuario();
	},
	buscar_usuario:function () {
		this.fetch()
	}
});