Loviz.Views.Tienda = Backbone.View.extend({
	el:$('body'),
	events: {
		'click .link': 'link_intero',
		'click header .menu_movil': 'desplegar_menu',
		'click header .desplegado': 'ocultar_menu',
	},
	initialize : function () {
	},
	link_intero:function (e) {
		e.preventDefault();
		var link = e.currentTarget.pathname;
		
		window.routers.base.navigate(link, {trigger:true});
	},
	desplegar_menu:function () {
		$('.main_menu').slideDown('slow');
		$('.menu_movil').addClass('desplegado');
		$('.menu_movil .icono').removeClass('icon-menu').addClass('icon-cross');
	},
	ocultar_menu:function () {
		$('.main_menu').slideUp('slow');
		$('.menu_movil').removeClass('desplegado');
		$('.menu_movil .icono').removeClass('icon-cross').addClass('icon-menu');
	}
});
