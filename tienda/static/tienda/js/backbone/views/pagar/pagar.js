Loviz.Views.Pagar = Backbone.View.extend({
	el:$('#main'),
    template: swig.compile($("#pagar_template").html()),	
	events: {
	},
	initialize : function () {

	},
	render:function (estado) {
		var html = this.template();
        this.$el.html(html);
        this.add_lineas_resumen();
	    this.add_total_resumen();
        this.rellenar_segun_estado(estado);
	},
	rellenar_segun_estado:function (estado) {
		if (estado === 'identificar') {
			var paso_login = new Loviz.Views.Paso_login({model:this.model,el:this.$('#paso_actual')});			
		}else if (estado === 'metodo_envio') {
			var paso_envio = new Loviz.Views.Paso_envio({model:this.model,el:this.$('#paso_actual')});
		}else if(estado === 'metodo_pago'){
			var paso_metodo = new Loviz.Views.Paso_pagar({model:this.model,el:this.$('#paso_actual')});
		}
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
		this.$('.linea_resumen').empty().append(viewTotal.$el);
	}
});
