Loviz.Views.Navegador = Backbone.View.extend({
	el:$('#navegador'),
	events: {
	},
	initialize : function () {
		var self=this;
		var menu_offset = this.$el.offset();
		$(window).on('scroll', function() {
			if($(window).scrollTop() > menu_offset.top) {
				self.$el.addClass('menu-fijo');
			} else {
				self.$el.removeClass('menu-fijo');
		    }
		});
	},
});
