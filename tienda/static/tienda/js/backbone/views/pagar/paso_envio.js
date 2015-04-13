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
        this.$('.direciones_gravadas').empty();
        window.collections.direcciones.forEach(this.mi_direccion,this)
    },
    mi_direccion:function (dire) {
        var vista = new Loviz.Views.Direccion({
            model:dire
        })
        this.$('.direciones_gravadas').append(vista.$el);
    },
    siguiente_paso:function () {
        var direccion = $('.direccion_elegida:checked').val();
        var metodo = $('input[name=metodo_envio]:checked').val();
        if (direccion!==undefined) {
            if (metodo!==undefined) {
                
            }else{
                $('.metodo_envio').addClass('has-error');
            }
        }else{
            $('.direciones_gravadas').addClass('has-error');
        }
    },
    seleccionado:function (e) {
        $('.direciones_gravadas label').removeClass('seleccionado');
        $(e.currentTarget).addClass('seleccionado');
    }
});