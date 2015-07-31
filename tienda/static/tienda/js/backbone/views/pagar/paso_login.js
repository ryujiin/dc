Loviz.Views.Paso_login = Backbone.View.extend({
    template:swig.compile($("#paso_login_template").html()),    
    template_logueado:swig.compile($("#logueado_pagar_templete").html()),
	events: {
        'click .mostrar_registro':'mostrar_registro',
    },
    initialize: function () {
        this.model = window.models.usuario;
        this.ver_que_mostrar();
        //this.verificar_login();
        //this.listenTo(window.views.pagar.model, "change", this.aparecer, this);        
    },
    render: function () {        
		var html = this.template(this.model.toJSON());
        this.$el.html(html);  
    },
    render_logueado:function () {
        var html = this.template_logueado(this.model.toJSON());
        this.$el.html(html);
    },
    ver_que_mostrar:function () {
        if (this.model.id===undefined) {
            this.render();
            this.addlogin();
            this.addregistro();
            debugger;
        }else{
            this.render_logueado();
            debugger;
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
});