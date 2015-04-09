Loviz.Views.Mini_user = Backbone.View.extend({
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
        if (this.$el.selector==='#mini_user_movil') {
            debugger;
            this.template = swig.compile($("#mini_usuario_movil_template").html());
        };
        var html = this.template(datos);
        this.$el.html(html);
    },
});