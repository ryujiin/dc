Loviz.Views.Tienda = Backbone.View.extend({
	el:$('body'),
	events: {
		'click .link': 'link_intero',
		'click header .menu_movil': 'desplegar_menu',
		'click header .desplegado': 'ocultar_menu',
		'click .footer_menu_bottom .block_footer':'mostrar_menu_footer',
	},
	initialize : function () {
	},
	link_intero:function (e) {
		e.preventDefault();
		var link = e.currentTarget.pathname;
		this.ocultar_menu();
		window.routers.base.navigate(link, {trigger:true});
	},
	desplegar_menu:function () {
		$('.main_menu').slideDown('slow');
		$('.menu_movil').addClass('desplegado');
		$('.menu_movil .icono').removeClass('icon-menu').addClass('icon-cross');
	},
	ocultar_menu:function () {
		var ancho = $(window).width();
		if (ancho<768) {
			$('.main_menu').slideUp('slow');
			$('.menu_movil').removeClass('desplegado');
			$('.menu_movil .icono').removeClass('icon-cross').addClass('icon-menu');	
		};		
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
	mostrar_menu_footer:function(e){
		debugger;
	}
});
