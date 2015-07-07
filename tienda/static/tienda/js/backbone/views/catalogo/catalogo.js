Loviz.Views.Catalogo = Backbone.View.extend({	
	className: 'cotenedor',
	el:$('#main'),
	
    template: swig.compile($("#catalogo_template").html()),

	events: {
		'click .refinamiento-nav button':'mostrar_refinamiento',
		'click .js-panel-close-btn':'cerrar_refinamiento',
	},
	initialize : function () {
		var self = this;
	},
	render:function (categoria) {
		var datos = this.get_titulo(categoria);
		var html = this.template(datos);
        this.$el.html(html);
        this.$el.hide();
        this.crear_bread(categoria);
        this.crear_bloque_categoria(categoria);
        this.mostrar_productos(categoria);
        this.mostrar_filtros();
        this.$el.slideDown('slow');
	},
	crear_bread:function (categoria) {
		var bread = new Loviz.Views.Breadcrumb(categoria);
	},
	crear_bloque_categoria:function (categoria) {
		var modelo = window.collections.categorias.findWhere({slug:categoria});
		var categoria = new Loviz.Views.Categorias(this.$('.categorias'));
		categoria.model = modelo;
		categoria.render();
	},
	mostrar_productos:function (cate) {
		this.$('caja_cargando').show('slow');
		var self = this;
		var productos = new Loviz.Collections.Productos();
		productos.fetch({
			data:$.param({categoria:cate})
		}).done(function () {
			productos.forEach(self.add_producto,self);
			self.$('caja_cargando').hide('slow');
		})
	},
	add_producto:function (modelo) {
		var producto = new Loviz.Views.Producto({ model: modelo });
		this.$('.productos').append(producto.render().el);
	},
	mostrar_filtros:function () {
		var colores = window.collections.colores;
		colores.forEach(this.add_color,this);
	},
	get_titulo:function (categoria) {
		var categoria = window.collections.categorias.findWhere({slug:categoria}).toJSON();
		var titulo = {};
		this.buscar_nombres(categoria,titulo);
		if (categoria.padre !==null) {
			categoria = window.collections.categorias.findWhere({slug:categoria.padre}).toJSON();
			this.buscar_nombres(categoria,titulo);
			if (categoria.padre!==null) {
				categoria = window.collections.categorias.findWhere({slug:categoria.padre}).toJSON();
				this.buscar_nombres(categoria,titulo);
			};
		};
		return titulo;
	},
	buscar_nombres:function (categoria,titulo) {
		if (categoria.seccion === 'estilo') {
			titulo.estilo = categoria.nombre;
		};		
		if (categoria.seccion === 'categoria') {
			titulo.categoria = categoria.nombre;
		};
		if (categoria.seccion==='genero') {
			titulo.genero =categoria.nombre;
		};
	},
	mostrar_refinamiento:function () {
		this.$("#secundario").addClass('is_visible');
	},
	cerrar_refinamiento:function () {
		this.$("#secundario").removeClass('is_visible');	
	},
	add_color:function (color) {
		var link_color = new Loviz.Views.Filtro_colores({model:color});
		this.$('.colores ul').append(link_color.$el);
		debugger;
	}
});