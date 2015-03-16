Loviz.Views.Tienda = Backbone.View.extend({
	el:$('body'),
	events: {
		'click .link': 'link_intero',
	},
	initialize : function () {
	},
	link_intero:function (e) {
		e.preventDefault();
		var link = e.currentTarget.pathname;
		
		window.routers.base.navigate(link, {trigger:true});
	},
});
