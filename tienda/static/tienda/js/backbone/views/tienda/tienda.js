Loviz.Views.Tienda = Backbone.View.extend({
	el:$('body'),
	events: {
		'click .link': 'link_intero',
		'click .logo' : 'go_home',
		'click header .icono-mobil.boton-menu.mostrar': 'menu_mobil',
		'click header .icono-mobil.boton-menu.ocultar': 'menu_mobil_ocultar',
		'click .footer_menu_bottom .block_footer':'mostrar_menu_footer',
		'click .header .menu_principal a': 'menu_mobil_ocultar',
	},
	initialize : function () {
		var self = this;
		window.routers.base.on('route',function(e){
			self.menu_mobil_ocultar();
        });
	},
	link_intero:function (e) {
		e.preventDefault();
		var link = e.currentTarget.pathname;
		window.routers.base.navigate(link, {trigger:true});
	},
	obt_galleta : function(){
		var galleta = $.cookie('carrito');
		if (galleta==null) {
			console.log('veamos');
			var session = getRandomChar();
			$.cookie('carrito',session,{ expires: 1, path: '/'});
			galleta = session;
		};
		function getRandomChar() {
			numCara = 50
			chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
			pass ='';
			for (i=0;i<numCara;i++) {
				x = Math.floor(Math.random()*62);
				pass+=chars.charAt(x);
			};
			return pass
		};
		return galleta
	},
	go_home:function () {
		window.routers.base.navigate('/', {trigger:true});
	},
	menu_mobil:function () {
		this.$el.addClass('push');
		$("header .icono-mobil.boton-menu").removeClass('mostrar').addClass('ocultar');
		this.$('header .icono-mobil.boton-menu span').removeClass('glyphicon-menu-hamburger').addClass('glyphicon-menu-left');
	},
	menu_mobil_ocultar:function () {
		this.$el.removeClass('push');
		$("header .icono-mobil.boton-menu").removeClass('ocultar').addClass('mostrar');
		this.$('header .icono-mobil.boton-menu span').removeClass('glyphicon-menu-left').addClass('glyphicon-menu-hamburger');
	},
	cambiando_page:function () {
		$('html, body').animate({scrollTop: 10}, 700);
	}
});
