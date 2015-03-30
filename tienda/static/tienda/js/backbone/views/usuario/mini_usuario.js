Loviz.Views.Mini_user = Backbone.View.extend({
    el:$('#usuario_mini'),
    template: swig.compile($("#usuario_mini_template").html()),    
    events: {
    },    
    initialize: function () {
    	this.render();
	    this.listenTo(this.model, "change", this.render, this);    	
    },    
    render: function () {
        var datos = this.model.toJSON();
        if (datos.id===undefined) {
        	this.template = swig.compile($("#usuario_mini_loguin_template").html());
        }else{
        	this.template = swig.compile($("#usuario_mini_template").html());
        }
        var html = this.template(datos);
        this.$el.html(html);
    },
});