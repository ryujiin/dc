Loviz.Views.Usuario = Backbone.View.extend({
	el:$('#main'),
	events: {
		'click .mostrar_registro':'mostrar_registro',
	},
	initialize : function () {
		var self = this;        
        this.listenTo(this.model, "change", this.render, this);
	},
	render:function () {
		this.saber_template();
		var datos = this.model.toJSON();
		var html = this.template(datos);
        this.$el.html(html);
        this.no_login();
	},
	no_login:function () {
		if (this.model.id===undefined) {
			this.paso_login = new Loviz.Views.Form_login();
			this.$('.formulario_login').append(this.paso_login.$el)
			this.paso_nuevo_user = new Loviz.Views.Form_nuevo_user();
			this.$('.formulario_nuevo_user').append(this.paso_nuevo_user.$el)
			this.paso_nuevo_user.$el.hide();
		}
	},
	saber_template:function () {
		if (this.model.id===undefined) {
			this.template = swig.compile($("#usuario_nologin_template").html());
		}else{
			this.template = swig.compile($("#usuario_login_template").html());
		}
	},
	mostrar_registro:function () {
		this.$('.mostrar_registro').hide();
        this.paso_nuevo_user.$el.show();
	}
});