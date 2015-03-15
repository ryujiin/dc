Oficina.Views.Pagina = Backbone.View.extend({
	events: {
		'click .link' : 'link_intero',
	},
	initialize : function ($el) {
		var self = this;
		this.$el = $el;
	},
	link_intero:function (e) {
		e.preventDefault();
		var link = e.currentTarget.pathname;
		
		window.routers.base.navigate(link, {trigger:true});
	},
	activarlo:function () {
		$('.nav-sidebar li').each(function(i,v){
			if (v.dataset.seccion===window.app.oficina) {
				$(v).addClass('active')
			}else{
				$(v).removeClass('active')
			}
		})
	},
});