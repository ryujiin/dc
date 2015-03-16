Loviz.Views.Sliders_Home = Backbone.View.extend({
	className : 'slider_home',
	el:$('#slider_home'),
    //template: swig.compile($("#catalogo_template").html()),
	events: {
	},
	initialize : function () {
		this.collection.forEach(this.addslide,this);
		this.add_carrusel();
	},
	render:function () {
	},
	addslide:function (slide) {
		var slide_view = new Loviz.Views.Slider_Home({model:slide});
		this.$el.append(slide_view.render().el);
	},
	add_carrusel:function () {
		this.$el.owlCarousel({
		    loop:true,
		    margin:10,
		    autoWidth:true,
		    items:2,
		    center:true,	
		})
	}
});