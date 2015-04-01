Loviz.Views.Sliders_Home = Backbone.View.extend({
	className : 'slider_home',
	el:$('#slider_home'),
    //template: swig.compile($("#catalogo_template").html()),
	events: {
	},
	initialize : function () {
		var self = this;
		this.render();
		window.routers.base.on('route',function(e){
            self.aparecer(e);
        });
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
	aparecer:function (e) {
		if (e!=='root') {
            this.$el.slideUp('slow');
        }else{
        	this.$el.slideDown('slow');
        }
	}
});