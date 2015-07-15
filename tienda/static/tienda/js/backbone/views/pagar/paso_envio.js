Loviz.Views.Paso_envio = Backbone.View.extend({
    template:swig.compile($("#paso_envio_template").html()),    
	events: {
        'click .add_direccion':'add_direccion',
        'click .caja_next .btn':'siguiente_paso',
        'click .direciones_gravadas label':'seleccionado',
    },
    initialize: function () {
    	this.render();
        this.listenTo(window.views.pagar.model, "change", this.aparecer, this);        
        this.listenTo(window.collections.direcciones, "add", this.mi_direccion, this);
    },
    render: function () {
		var html = this.template();
        this.$el.html(html);
        this.listadirecciones();
        this.metodos_envio();
    },
    aparecer:function () {
    	if (window.views.pagar.model.toJSON().estado ==='envio') {
    		this.$el.show();
    	}else{
    		this.$el.hide();
    	}
    },
    add_direccion:function () {
        this.$('.nueva_direccion_form').empty();
        var form_direccion = new Loviz.Views.Form_direccion();
        this.$('.nueva_direccion_form').append(form_direccion.$el);
    },
    listadirecciones:function () {
        this.$('.direciones_gravadas .lista').empty();
        window.collections.direcciones.forEach(this.mi_direccion,this)
    },
    mi_direccion:function (dire) {
        var vista = new Loviz.Views.Direccion({
            model:dire
        })
        this.$('.direciones_gravadas').append(vista.$el);
    },
    siguiente_paso:function () {
        var self = this;
        var direccion = $('.direccion_elegida:checked').val();
        var metodo = $('input[name=metodo_envio]:checked').val();
        if (direccion!==undefined) {
            if (metodo!==undefined) {
                window.models.pedido.set({
                    user:window.models.usuario.id,
                    metodoenvio:metodo,
                    direccion_envio:direccion,
                    estado:8,
                    gasto_envio:$('input[name=metodo_envio]:checked').data('gasto'),
                });
                window.models.pedido.save().done(function (data) {
                    self.model.set('estado','pagar');
                    window.models.carro.set('pedido',data.id);
                })
            }else{
                $('.metodo_envio').addClass('has-error');
                var mover_a = $("#metodo_envio_field").offset();
                mover_a.top = mover_a.top-50;
                $('html, body').animate({
                    scrollTop: mover_a.top
                }, 1000);
            }
        }else{
            $('.direciones_gravadas').addClass('has-error');
            var mover_a = $("#direccion_envio_field").offset();
            mover_a.top = mover_a.top-50;
            $('html, body').animate({
                    scrollTop: mover_a.top
                }, 1000);
        }
    },
    seleccionado:function (e) {
        $('.direciones_gravadas label').removeClass('seleccionado');
        $(e.currentTarget).addClass('seleccionado');
    },
    metodos_envio:function () {
        var self = this;
        window.collections.metodos.forEach(self.add_metodo,self)
    },
    add_metodo:function (metodo) {
        var vista = new Loviz.Views.Metodo_Envio({model:metodo});
        this.$('.metodo_envio').append(vista.$el)
    }
});