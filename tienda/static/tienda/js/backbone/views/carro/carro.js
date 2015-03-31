Loviz.Views.Carro = Backbone.View.extend({
	el:$('#carro'),
	template : swig.compile($("#carro_template").html()),
	template_vacio : swig.compile($("#carro_vacio_template").html()),
	events :{
		//'click .procesar':'go_procesar',
	},
	initialize: function () {
		var self = this;
	    this.listenTo(this.model, "change", this.render, this);
	    window.routers.base.on('route',function(e){
			self.desaparecer();
        });
	},
	render:function () {
		var modelo = this.model.toJSON();
		if (modelo.lineas===0) {
			var html = this.template_vacio(modelo);
		}else{
			var html = this.template(modelo);
		}
	    this.$el.html(html);
	    this.addLineas();
	    this.desaparecer();
	},
	desaparecer:function () {
		if (window.app.slug!=='carro') {
            this.$el.slideUp('slow');
        }else{
        	this.$el.slideDown('slow');
        }
	},
	addLineas:function (pagar) {
		var lineas = this.model.toJSON().lineas;
		var self = this;
		if (pagar==='pagar') {
			this.pagar=true;
		};
		if (lineas > 0) {
			this.lineas_colecion = new Loviz.Collections.Lineas();
			this.lineas_colecion.fetch({
				data:$.param({carro:this.model.id})
			}).done(function () {
				self.lineas_colecion.forEach(self.addLinea,self);
			})
		};
	},
	addLinea:function (linea) {
		var viewLinea = new Loviz.Views.Linea_carro({model:linea});
		if (this.pagar===true) {
			viewLinea.template=swig.compile($("#comprar_resumen_linea_template").html());
		};
		this.$('#lineas_carro').append(viewLinea.render().el)
	},
})