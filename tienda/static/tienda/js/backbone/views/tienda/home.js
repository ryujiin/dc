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
		this.add_carruseles();
	},
	add_slider:function () {
		var home_slider = new Loviz.Views.Sliders_Home({
			collection:window.collections.sliderHome,
		});
		this.$("#sliders_home").append(home_slider.$el);
	},
	add_carruseles:function () {
		var self=this;
		var productos = new Loviz.Collections.Productos();
		productos.fetch().done(function (data) {
			self.recorrer_coleccion(productos,'#novedades_home');
			var ofertas = productos.where({en_oferta:true})
			self.recorrer_coleccion(ofertas,'#ofertas_home')
		});

	},
	recorrer_coleccion:function (coleccion , contenedor) {
		var self = this;
		var num = 0;
		coleccion.forEach(function (data) {
			if (num<3) {
				var producto = new Loviz.Views.Producto({model:data});
				producto.render();
				self.$(contenedor +' .cuerpo_slider').append(producto.$el)
				num++;
			};			
		})
		self.$(contenedor +' .cuerpo_slider').owlCarousel({
		    slideSpeed : 300,
		    paginationSpeed : 400,
		    items:2,
		    itemsMobile: [479,2]
		})
	}
});
