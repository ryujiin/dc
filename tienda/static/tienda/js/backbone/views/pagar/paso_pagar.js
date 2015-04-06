Loviz.Views.Paso_pagar = Backbone.View.extend({
    template:swig.compile($("#paso_pagar_template").html()),    
	events: {
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
    	if (window.views.pagar.model.toJSON().estado ==='pagar') {
    		this.$el.show();
    	}else{
    		this.$el.hide();
    	}
    }
});