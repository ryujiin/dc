Loviz.Views.Carro = Backbone.View.extend({
	el:$('#main'),
	template : swig.compile($("#carro_template").html()),
	template_vacio : swig.compile($("#carro_vacio_template").html()),
	events :{
		//'click .procesar':'go_procesar',
	},
	initialize: function () {
		var self = this;
		this.viendose = false;
	    this.listenTo(this.model, "change", this.varificar_numero, this);
	    window.routers.base.on('route',function(e){
			if (e!=='carro') {
				self.viendose = false;
			};
        });
	},
	render:function () {	
		if (window.app.slug==='carro') {			
			this.viendose = true;
			var modelo = this.model.toJSON();
			var html = this.template(modelo);
		    this.$el.html(html);
		    this.addLineas();
		    this.addTotal();	
		};		
	},
	render_vacio:function () {
		if (window.app.slug==='carro') {
			this.viendose = false;
			var modelo = this.model.toJSON();
			var html = this.template_vacio(modelo);
		    this.$el.html(html);
		}
	},
	addLineas:function (pagar) {
		var lineas = this.model.toJSON().lineas;
		var self = this;
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
	varificar_numero:function () {
		if (this.model.toJSON().lineas===0) {
			this.render_vacio();
		}else{
			if (this.viendose===false) {	
				this.render();
			};
		}
	},
	addTotal:function () {
		var viewTotal = new Loviz.Views.Carro_tatal({
			model:this.model
		});
		this.$('#carro_total').append(viewTotal.$el);
	}
})