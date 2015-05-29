Loviz.Views.Sliders_Home = Backbone.View.extend({
	className : 'slider_home',
	events: {
	},
	initialize : function () {
		var self = this;
		this.render();
	},
	render:function () {
		this.collection.forEach(this.addslide,this);
		this.add_carrusel();
	},
	addslide:function (slide) {
		var slide_view = new Loviz.Views.Slider_Home({model:slide});
		this.$el.append(slide_view.render().el);
	},
	add_carrusel:function () {
		this.$el.owlCarousel({
		    slideSpeed : 300,
		    paginationSpeed : 400,
		    singleItem:true
		})
	},
});