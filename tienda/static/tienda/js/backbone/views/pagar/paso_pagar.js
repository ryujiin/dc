Loviz.Views.Paso_pagar = Backbone.View.extend({
    template:swig.compile($("#paso_pagar_template").html()),    
	events: {
        'click #metodo_pago_select input[name=metodo_pago]':'selecionado',
    },
    initialize: function () {
    	this.render();
        this.listenTo(window.views.pagar.model, "change", this.aparecer, this);
    },
    render: function () {
		var html = this.template();
        this.$el.html(html);
        this.$('.caja_pago').addClass('invisible');
    },
    aparecer:function () {
    	if (window.views.pagar.model.toJSON().estado ==='pagar') {
    		this.$el.show();
    	}else{
    		this.$el.hide();
    	}
    },
    selecionado:function (e) {
        console.log(e)
        
        debugger;
    }
});