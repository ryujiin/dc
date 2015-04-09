Loviz.Views.Paso_login = Backbone.View.extend({
    template:swig.compile($("#paso_login_template").html()),    
	events: {
        'click .mostrar_registro':'mostrar_registro',
    },
    initialize: function () {
        this.render();
        this.listenTo(window.views.pagar.model, "change", this.aparecer, this);        
    },
    render: function () {
        this.model = window.models.usuario;
		var html = this.template(this.model.toJSON());
        this.$el.html(html);
        this.addlogin();
        this.addregistro();
    },
    aparecer:function () {
        if (window.views.pagar.model.toJSON().estado ==='identificar') {
            this.$el.show();
        }else{
            this.$el.hide();
        }
    },
    addlogin:function () {
        var formulario = new Loviz.Views.Form_login();
        this.$('.formulario_login').append(formulario.$el);
    },
    addregistro:function () {
        this.form_registro = new Loviz.Views.Form_nuevo_user();
        this.$('.formulario_nuevo_user').append(this.form_registro.$el);
        this.form_registro.$el.hide();
    },
    mostrar_registro:function () {
        this.$('.mostrar_registro').hide();
        this.form_registro.$el.show();
    }
});