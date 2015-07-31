Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		'catalogo/:categoria/':'catalogo',
		'producto/:producto/':'producto_single',
		'carro/':'carro',
		'pagar/':'pagar_redireccion',
		'pagar/:estado/':'pagar',
		'cliente/cuenta/':'cliente_cuente',
		'cliente/salir/':'salir',
		'*notFound': 'notFound',
	},
	initialize : function () {
		this.bind('route', this._pageView);
		this.historia = [];
		this.listenTo(this, 'route', function (name, args) {
		  this.historia.push({
		    name : name,
		    args : args,
		    fragment : Backbone.history.fragment
		  });
		});
  	},
	root : function () {
		window.app.slug='home';
		window.views.home.render();
		window.views.tienda.cambiando_page();
	},
	catalogo:function(categoria){
		window.app.slug='catalogo';
		if (window.views.catalogo === undefined) {
			window.views.catalogo = new Loviz.Views.Catalogo();
		}
		window.views.catalogo.render(categoria);
		window.views.tienda.cambiando_page();
	},
	producto_single:function (producto) {
		window.app.slug='producto_single';
		var modelo = new Loviz.Models.Producto_Single();
		modelo.buscar(producto);
		window.views.tienda.cambiando_page();
	},
	carro:function () {
		window.app.slug='carro';
		window.views.carro.varificar_numero();
		window.views.tienda.cambiando_page();
	},
	pagar_redireccion:function () {
		var num_historia = this.historia.length;
		num_historia--;
		var url_anterior = this.historia[num_historia]
		if (url_anterior.name==='pagar_redireccion') {
			num_historia = num_historia-2;
			var url = this.historia[num_historia];
			this.navigate(url.fragment, {trigger:true});
		}else{
			if (window.models.carro.toJSON().lineas>0) {
				if (window.models.usuario.id!==undefined) {
					var estado = window.models.pedido.toJSON().estado_pedido;
					if (estado ==='autenticado') {
						this.navigate('/pagar/metodo_envio/', {trigger:true})
					}else if(estado === 'metodo_envio'){
						this.navigate('/pagar/metodo_pago/', {trigger:true})
					}else{
						this.navigate('/cuenta/pedidos', {trigger:true});
					}
				}else{
					this.navigate('/pagar/identificar/', {trigger:true})
				}
			}else{
				this.navigate('/', {trigger:true});
			}
		}		
	},
	pagar:function (estado) {
		if (estado==='identificar'|| estado==='metodo_envio' || estado==='metodo_pago' ) {
			if (window.models.carro.toJSON().lineas>0) {
			window.app.slug='pagar';
			window.views.pagar.render(estado);
			window.views.tienda.cambiando_page();	
			}else{
				this.navigate('/', {trigger:true});
			}
		}else{
			this.notFound();
		}
	},
	cliente_cuente:function () {
		window.app.slug='cliente';
		window.views.usuario.render();
		window.views.tienda.cambiando_page();
	},
	salir:function () {
		console.log('salir');
		$.removeCookie('carrito', { path: '/' });
		window.location.href='/ajax/salir/';
	},
	notFound:function () {
		console.log('Estamos en una pagina vacia')
	},
	_pageView: function() {
	  var path = Backbone.history.getFragment();
	  ga('send', 'pageview', {page: "/" + path});
	}
});