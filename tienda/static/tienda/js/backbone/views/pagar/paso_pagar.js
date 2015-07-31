Loviz.Views.Paso_pagar = Backbone.View.extend({
    template:swig.compile($("#paso_pagar_template").html()),    
	events: {
        'click #metodo_pago_select input[name=metodo_pago]':'selecionado',
        'submit #pago_tarjeta_credito':'pagar_tarjeta',
        'mouseover .que_es_cvc':'mostrar_tooltip',
        'mouseout .que_es_cvc':'borrar_tooltip',
    },
    initialize: function () {
    	this.render();
    },
    render: function () {
		var html = this.template();
        this.$el.html(html);
        this.$('.caja_pago').hide();
    },
    selecionado:function (e) {
        $(".caja_pago").slideUp();
        var metodo = e.target.dataset.metodo;
        $(".caja_pago."+metodo).slideDown();
    },
    pagar_tarjeta:function (e) {
        e.preventDefault();
        debugger;
    },
    mostrar_tooltip:function () {
        $('.cvc_tarjeta .tooltip_loviz').fadeIn();
    },
    borrar_tooltip:function () {
        $('.cvc_tarjeta .tooltip_loviz').fadeOut();        
    }
});