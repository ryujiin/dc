Loviz.Views.Tienda = Backbone.View.extend({
	el:$('body'),
	events: {
		'click .link': 'link_intero',
		'click .logo' : 'go_home',
		'click header .menu_movil': 'desplegar_menu',
		'click header .desplegado': 'ocultar_menu',
		'click .footer_menu_bottom .block_footer':'mostrar_menu_footer',
	},
	initialize : function () {
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
});
