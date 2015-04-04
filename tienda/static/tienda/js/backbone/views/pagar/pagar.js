Loviz.Views.Pagar = Backbone.View.extend({
	el:$('#main-contenido'),
	
    template: swig.compile($("#pagar_template").html()),

	events: {
	},
	initialize : function () {
		var self = this;
		window.routers.base.on('route',function(e){
			self.desaparecer(e);
        });
	    this.listenTo(this.model, "change", this.render, this);
	},
	render:function () {
		var datos = this.model.toJSON();
		var html = this.template(datos);
        this.$el.html(html);
        this.$el.hide();
        this.$el.slideDown('slow');
	    this.ver_status();        
	},
	desaparecer:function (e) {
		if (e!=='pagar') {
            this.$el.slideUp('slow');
        };
	},
	ver_status:function () {
		this.estado = 'id'
		if (window.models.usuario.id !== undefined) {
			this.estado = 'envio'
		}
	},
});