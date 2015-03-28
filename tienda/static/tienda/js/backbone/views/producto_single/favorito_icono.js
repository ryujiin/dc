Loviz.Views.LovedIcono = Backbone.View.extend({
    className:'favoritos',
    template:swig.compile($("#favoritos_template").html()),
	events: {
		'click .icono':'add_favorito',
		'mouseenter .icono':'efecto_entrar',
		'mouseleave .icono':'efecto_salir',
    },
    initialize: function () {
    	this.is_favorito=false;
    	this.render();
    },
    render: function () {
		var html = this.template();
        this.$el.html(html);
    },
    favorito_check:function () {
    	this.$('.icono').removeClass('icon-heart3').addClass('icon-heart checkin');
    	this.is_favorito = true;
    },
    efecto_entrar:function () {
    	if (this.is_favorito===false) {
    		this.$('.icono').removeClass('icon-heart3').addClass('icon-heart checkin');
    	};
    },
    efecto_salir:function () {
    	if (this.is_favorito===false) {
    		this.$('.icono').removeClass('icon-heart checkin').addClass('icon-heart3');
    	};
    },
    add_favorito:function () {
    	var user = window.models.usuario;
    	if (this.is_favorito===false) {
    		var modelo = new Loviz.Models.Favorito();
    		modelo.set({usuario:user.id,producto:this.model.id});
    		if (user.id!==undefined) {
    			//modelo.save();
    		};
    		this.favorito_check();
    		this.efecto_isfavorito();
    	};
    },
    efecto_isfavorito:function () {
    	this.$('.add_ok').slideDown(600).delay(1500).slideUp( 600 );
    }
});