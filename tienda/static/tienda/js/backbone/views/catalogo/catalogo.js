Loviz.Views.Catalogo = Backbone.View.extend({	
	className: 'cotenedor',
	el:$('#main'),
	
    template: swig.compile($("#catalogo_template").html()),

	events: {
		'click .refinamiento-nav button':'mostrar_refinamiento',
		'click .js-panel-close-btn':'cerrar_refinamiento',
		'click .link_refinamiento.inactivo':'filtrando_catalogo',
		'click .link_refinamiento.activo':'quitar_filtro',
		'click .clear_refinamiento':'limpiar_filtro',
	},
	initialize : function () {
		var self = this;
		this.filtro = false;
		this.filtros = new Loviz.Collections.Filtros();
		this.num_items_model = new Loviz.Models.Filtro();
		this.min = 0;
		this.max = 10000;
	},
	render:function (categoria) {
		var datos = this.get_titulo(categoria);
		var html = this.template(datos);
        this.$el.html(html);
        this.add_num_items();        
        this.crear_bread(categoria);
        this.crear_bloque_categoria(categoria);
        this.mostrar_productos(categoria);
        this.mostrar_filtros();
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
			self.num_items_model.set({num:self.productos.length});
		});

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
	},
	filtrando_catalogo:function (e) {
		e.preventDefault();
		var tipo = e.target.dataset.tipo;
		var color = e.target.dataset.color;
		var min =parseInt(e.target.dataset.min);
		var max = parseInt(e.target.dataset.max);

		this.verificar_filtro();
		this.productos.forEach(function (m) {
			m.set({visible:false});
		});
		if (tipo==='precio') {
			this.modificar_precio(min,max);
			$('.refinamiento_precio .link_refinamiento').removeClass('activo').addClass('inactivo')
			$(e.target).removeClass('inactivo').addClass('activo');
		}else if(tipo ==='color'){
			this.add_filtro_color(color);
			$(e.target).removeClass('inactivo').addClass('activo');			
		}
	},
	add_filtro_color:function (color) {
		var conincidencia = this.filtros.where({color:color});
		if (conincidencia.length===0) {
			var nuevo_filtro = new Loviz.Models.Filtro();
			nuevo_filtro.set({color:color});	
			this.filtros.add(nuevo_filtro);
			this.filtros.forEach(this.filtro_producto,this)
		};
	},
	verificar_filtro:function () {
		if (this.filtro ===false) {
			this.$('.clear_refinamiento').fadeIn();
			this.filtro = true;
		}
	},
	modificar_precio:function (min,max) {
		this.max = max;
		this.min = min;
		if (this.filtros.length===0) {
			this.productos.forEach(this.aparecer_producto,this);
		}else{
			this.filtros.forEach(this.filtro_producto,this);
		}
	},
	aparecer_producto:function (producto_modelo) {
		var valor = producto_modelo.toJSON().precio_valor;
		if (this.min<valor && this.max > valor) {
			producto_modelo.set({visible:true});
		};
	},
	filtro_producto:function (filtro) {
		var filtro = filtro.toJSON();
		modelos = this.productos.where({color:filtro.color});
		modelos.forEach(this.aparecer_producto,this);
		var visibles  = this.productos.where({visible:true})
		this.num_items_model.set({num:visibles.length});
	},
	add_num_items:function () {
		var num_items = new Loviz.Views.Num_items({
			model: this.num_items_model,
			el:this.$('.resultados')
		});
	},
	quitar_filtro:function (e) {
		e.preventDefault();
		$(e.target).removeClass('activo').addClass('inactivo');
		var tipo = e.target.dataset.tipo;
		var color = e.target.dataset.color;
		if (tipo==='precio') {
			this.min=0;
			this.max=10000;
		}else{
			var modelo = this.filtros.findWhere({color:color});
			this.filtros.remove(modelo);
		}
		this.productos.forEach(this.aparecer_producto,this);
		var visibles = this.productos.where({visible:true});
		if (visibles.length===this.productos.length) {
			this.limpiar_filtro();
		};
	},
	limpiar_filtro:function () {
		this.filtro = false;
		this.$('.clear_refinamiento').fadeOut();
		this.$('.link_refinamiento').removeClass('activo');
		this.filtros.reset();
		this.$('.producto').fadeIn();
	},
});