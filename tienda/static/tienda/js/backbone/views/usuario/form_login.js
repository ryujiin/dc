Loviz.Views.Form_login = Backbone.View.extend({
    tagName:'form',
    template: swig.compile($("#form_login_template").html()),    
    events: {
        'submit':'login',
    },    
    initialize: function () {
    	this.render();
    },    
    render: function () {
        var html = this.template();
        this.$el.html(html);
    },
    login:function (e) {
        e.preventDefault();
        var verificar = this.verificar();
        console.log(verificar)
        debugger;
    },
    verificar:function () {
        var email = this.$('#form_email').val()
        var pass = this.$('#form_pass').val()
        if (email === '') {
            this.$('.form_login').addClass('has-error').removeClass('has-success');
        }else{
            this.$('.form_login').removeClass('has-error').addClass('has-success');
        }
        if (pass==='') {
            this.$('.form_pass').addClass('has-error').removeClass('has-success');
        }else{
            this.$('.form_pass').removeClass('has-error').addClass('has-success');            
        }
        if (email==='') {
            return false
        }
        if (pass==='') {
            return false
        }
        return true
    }
});