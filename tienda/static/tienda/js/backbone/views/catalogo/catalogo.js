Loviz.Views.Catalogo = Backbone.View.extend({
	className: 'cotenedor',
	el:$('#catalogo'),
	
    template: swig.compile($("#catalogo_template").html()),

	events: {
	},
	initialize : function () {
		var self = this;
		window.routers.base.on('route',function(e){
			self.desaparecer(e);
        });
	},
	render:function (categoria) {
		var html = this.template();
        this.$el.html(html);
        this.$el.hide();
        this.crear_bread(categoria);
        this.crear_bloque_categoria(categoria);
        this.mostrar_productos(categoria);
        this.$el.slideDown('slow');
	},
	desaparecer:function (e) {
		if (e!=='catalogo') {
            this.$el.slideUp('slow');
        };
	},
	crear_bread:function (categoria) {
		var bread = new Loviz.Views.Breadcrumb(categoria);
	},
	crear_bloque_categoria:function (categoria) {
		var modelo = window.collections.categorias.findWhere({slug:categoria});
		var categoria = new Loviz.Views.Categorias({model:modelo});
	},
	mostrar_productos:function (cate) {
		this.$('caja_cargando').slideDown('slow');
		var self = this;
		var productos = new Loviz.Collections.Productos();
		productos.fetch({
			data:$.param({categoria:cate})
		}).done(function () {
			productos.forEach(self.add_producto,self);
			self.$('caja_cargando').slideUp('slow');
		})
	},
	add_producto:function (modelo) {
		var producto = new Loviz.Views.Producto({ model: modelo });
		this.$('.productos').append(producto.render().el);
	},
});