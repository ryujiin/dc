Loviz.Views.Paso_envio = Backbone.View.extend({
    template:swig.compile($("#paso_envio_template").html()),    
	events: {
        'click .add_direccion':'add_direccion',
    },
    initialize: function () {
    	this.render();
        this.listenTo(window.views.pagar.model, "change", this.aparecer, this);        
    },
    render: function () {
		var html = this.template();
        this.$el.html(html);
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
    }
});