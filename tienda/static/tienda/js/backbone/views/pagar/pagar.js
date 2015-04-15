Loviz.Views.Pagar = Backbone.View.extend({
	el:$('#main-contenido'),
	
    template: swig.compile($("#pagar_template").html()),

	events: {
	},
	initialize : function () {
		var self = this;
        this.listenTo(this.model, "change", this.cambiar_estado, this);
        this.listenTo(window.models.usuario, "change", this.ver_status, this);

		window.routers.base.on('route',function(e){
			self.desaparecer(e);
        });
	},
	render:function () {
		var html = this.template();
        this.$el.html(html);
        this.$el.hide();
        this.desaparecer();
	    this.poner_pasos();
	    this.add_lineas_resumen();
	    this.add_total_resumen();
	    this.ver_status();	    
	},
	desaparecer:function (e) {
		if (e!=='pagar') {
            this.$el.slideUp('slow');
        }else{
        	this.$el.slideDown('slow');
        }
	},
	ver_status:function () {
		this.model.set('estado' , 'ninguno');		
		this.model.set('estado' , 'identificar');
		if (window.models.usuario.id !== undefined) {
			this.model.set('estado' , 'envio');		
		}
		if (window.models.pedido!==undefined) {
			if (window.models.pedido.id!==undefined) {
				if (window.models.carro.toJSON().pedido===window.models.pedido.id) {
					this.model.set('estado','pagar');
				};
			};	
		};		
	},
	poner_pasos:function () {
		var paso_login = new Loviz.Views.Paso_login({
			model:this.model
		});
		this.$('#identificar_user_pagar').append(paso_login.$el)
		var paso_envio = new Loviz.Views.Paso_envio({
			model:this.model
		});
		this.$('#envio_pagar').append(paso_envio.$el)
		var paso_metodo = new Loviz.Views.Paso_pagar({
			model:this.model
		});
		this.$('#metodo_pago_pagar').append(paso_metodo.$el);
	},
	cambiar_estado:function () {
		var estado = this.model.toJSON().estado;
		this.$('.linea_progrecion .paso').removeClass('actual');
		this.$('.linea_progrecion .'+estado).addClass('actual');
	},
	add_lineas_resumen:function  () {
		var self = this;
		var lineas = new Loviz.Collections.Lineas()
		lineas.fetch({
			data:$.param({carro:window.models.carro.id})
		}).done(function () {
			lineas.forEach(self.add_linea,self)
		})
	},
	add_linea:function (linea) {
		var vista = new Loviz.Views.Linea_carro({model:linea});
		this.$('#linas_resumen').append(vista.$el);
	},
	add_total_resumen:function(){
		var viewTotal = new Loviz.Views.Carro_tatal({
			model:window.models.carro
		});
		this.$('.linea_resumen').append(viewTotal.$el);
	}
});