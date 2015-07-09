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
		var ajax_caja = new Loviz.Views.Ajax_loader();
		view.$el.append(ajax_caja.$el);
        ajax_caja.$el.fadeIn();
		var self =this;
		$.post('/ajax/login/',{username:user,password:pass})
            .done(function (data) {            	
                if (data.error_message!==undefined) {
                    if (view) {
                        view.mensaje_error(data)
                    }
                }else{
                    self.buscar_usuario();
                }
        		ajax_caja.$el.fadeOut();
            }).fail(function (data) {
        		ajax_caja.$el.fadeOut();
            })
	}
});