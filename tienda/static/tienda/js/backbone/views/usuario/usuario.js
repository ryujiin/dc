Loviz.Views.Usuario = Backbone.View.extend({
	el:$('#usuario'),
	
    template: swig.compile($("#usuario_template").html()),

	events: {
	},
	initialize : function () {
		var self = this;
		window.routers.base.on('route',function(e){
			self.desaparecer(e);
        });
	},
	render:function () {
		var html = this.template();
        this.$el.html(html);
        this.no_login();
	},
	desaparecer:function (e) {
		if (e!=='cliente_cuente') {
            this.$el.slideUp('slow');
        }else{
        	this.$el.slideDown('slow');
        }
	},
	no_login:function () {
		if (this.model.id===undefined) {
			var paso_login = new Loviz.Views.Form_login();
			this.$('.formulario_login').append(paso_login.$el)
		};
	}
});