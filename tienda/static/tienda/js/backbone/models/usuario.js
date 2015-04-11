Loviz.Models.Usuario = Backbone.Model.extend({
	url:'/api/cliente/perfil/',
	name:'perfil',
	initialize:function () {
		this.buscar_usuario();
	},
	buscar_usuario:function () {
		this.fetch().fail(function () {
			window.models.carro.buscar_carro();
		})
	},
	ingresar:function (user,pass,view) {
        $('#caja_ajax').show();
		var self =this;
		$.post('/ajax/login/',{username:user,password:pass})
            .done(function (data) {
                $('#caja_ajax').hide();
                if (data.error_message!==undefined) {
                    if (view) {
                        view.mensaje_error(data)
                    }
                }else{
                    self.buscar_usuario();
                }
            }).fail(function (data) {
                $('#caja_ajax').hide();
            })
	}
});