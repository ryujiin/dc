Loviz.Views.Paso_pagar = Backbone.View.extend({
    template:swig.compile($("#paso_pagar_template").html()),    
	events: {
        'click #metodo_pago_select input[name=metodo_pago]':'selecionado',
        'submit #payment-form':'pagar_stripe',
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
    pagar_stripe:function (e) {
        e.preventDefault();
        var public_key = e.target.dataset.stripeKey;
        //comenzamos con stripe
        Stripe.setPublishableKey(public_key);

        var stripeResponseHandler = function(status, response) {
            var $form = $('#payment-form');
            if (response.error) {
                // Show the errors on the form
                $form.find('.payment-errors').text(response.error.message);
                $form.find('button').prop('disabled', false);
            } else {
                // token contains id, last4, and card type
                var token = response.id;
                // Insert the token into the form so it gets submitted to the server
                $form.append($('<input type="hidden" name="stripeToken" />').val(token));
                // and re-submit                
                $.post( "/pago/stripe/", { stripeToken:token, carro : window.models.carro.id} ).done(function (data) {
                    if (data.status==='paid') {
                        window.location="/felicidades/"+data.pedido+"/";
                    };
                });
            }
        };

        var datos_card = {
            number:this.$('.card_number').val(),
            cvc:this.$('.card_cvc').val(),
            exp_month:this.$('.card-expiry-month').val(),
            exp_year:this.$('.card-expiry-year').val(),
        };
        //hacer el llamado a Stripe
        Stripe.card.createToken(datos_card, stripeResponseHandler);
    },
    mostrar_tooltip:function () {
        $('.cvc_tarjeta .tooltip_loviz').fadeIn();
    },
    borrar_tooltip:function () {
        $('.cvc_tarjeta .tooltip_loviz').fadeOut();        
    }
});