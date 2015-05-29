Loviz.Views.Home = Backbone.View.extend({
	el:$('#main'),
	template : swig.compile($("#home_template").html()),
	events: {
	},
	initialize : function () {
		console.log('home');
	},
	render:function () {
        var html = this.template();
        this.$el.html(html);
		this.add_slider();
		this.novedades();
	},
	add_slider:function () {
		var home_slider = new Loviz.Views.Sliders_Home({
			collection:window.collections.sliderHome,
		});
		this.$("#sliders_home").append(home_slider.$el);
	},
	novedades:function () {
		debugger;
	}
});
