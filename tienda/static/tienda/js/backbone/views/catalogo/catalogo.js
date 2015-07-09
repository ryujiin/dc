Loviz.Views.Catalogo = Backbone.View.extend({	
	className: 'cotenedor',
	el:$('#main'),
	
    template: swig.compile($("#catalogo_template").html()),

	events: {
		'click .refinamiento-nav button':'mostrar_refinamiento',
		'click .js-panel-close-btn':'cerrar_refinamiento',
		'click .link_refinamiento':'filtrando_catalogo',
		'click .clear_refinamiento':'limpiar_filtro',
	},
	initialize : function () {
		var self = this;
		this.filtro = false;
		this.filtros = new Loviz.Collections.Filtros();
		this.vista_producto = [];
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
		this.productos = new Loviz.Collections.Productos();
		this.productos.fetch({
			data:$.param({categoria:cate})
		}).done(function () {
			self.productos.forEach(self.add_producto,self);
			self.$('caja_cargando').hide('slow');
		})
	},
	add_producto:function (modelo) {
		var producto = new Loviz.Views.Producto({ model: modelo });
		this.$('.productos').append(producto.render().el);
		this.vista_producto.push(producto);
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
	},
	filtrando_catalogo:function (e) {
		e.preventDefault();
		if (this.filtro ===false) {
			this.$('.clear_refinamiento').fadeIn();
			this.filtro = true;
		};
		var tipo = e.target.dataset.tipo;
		var valor = e.target.dataset.valor;
		var conincidencia = this.filtros.where({valor:valor});
		if (conincidencia.length===0) {
			this.$('.producto').hide();
			var nuevo_filtro = new Loviz.Models.Filtro();
			nuevo_filtro.set({tipo:tipo,valor:valor});	
			this.filtros.add(nuevo_filtro);
			this.filtros.forEach(this.filtro_producto,this)
		};		
		$(e.target).addClass('activo');
	},
	limpiar_filtro:function () {
		this.filtro = false;
		this.$('.clear_refinamiento').fadeOut();
		this.$('.link_refinamiento').removeClass('activo');
		this.filtros.reset();
		this.$('.producto').fadeIn();
	},
	filtro_producto:function (filtro) {
		var filtro = filtro.toJSON();
		if (filtro.tipo == 'color') {
			var modelos = this.productos.where({color:filtro.valor});
			modelos.forEach(this.aparecer_producto,this);
		};		
	},
	aparecer_producto:function (producto_modelo) {
		var producto_modelo = producto_modelo;
		this.vista_producto.forEach(function(p){
			if (p.model.id===producto_modelo.id) {
				p.$el.fadeIn();
			};
		})
	}
});