Loviz.Views.Pagar = Backbone.View.extend({
	el:$('#main-contenido'),
	
    template: swig.compile($("#pagar_template").html()),

	events: {
	},
	initialize : function () {
		var self = this;
        this.listenTo(this.model, "change", this.cambiar_estado, this);

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
		this.model.set('estado' , 'identificar');
		if (window.models.usuario.id !== undefined) {
		this.model.set('estado' , 'envio');
		}
	},
	poner_pasos:function () {
		var paso_login = new Loviz.Views.Paso_login();
		this.$('#identificar_user_pagar').append(paso_login.$el)
		var paso_envio = new Loviz.Views.Paso_envio();
		this.$('#envio_pagar').append(paso_envio.$el)
		var paso_metodo = new Loviz.Views.Paso_pagar();
		this.$('#metodo_pago_pagar').append(paso_metodo.$el)
		var resumen_orden = new Loviz.Views.Resumen_pagar({
			model:window.models.carro
		});
		this.$('#resumen_orden').append(resumen_orden.$el)
		
	},
	cambiar_estado:function () {
		var estado = this.model.toJSON().estado;
		this.$('.linea_progrecion .paso').removeClass('actual');
		this.$('.linea_progrecion .'+estado).addClass('actual');
	}
});