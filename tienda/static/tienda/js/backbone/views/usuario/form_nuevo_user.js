Loviz.Views.Form_nuevo_user = Backbone.View.extend({
    tagName:'form',
    template: swig.compile($("#form_nuevo_user_template").html()),    
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
        debugger;
        e.preventDefault();
        var verificar = this.verificar();
        debugger;
        if (verificar === true) {
            debugger;
            $.post('/ajax/login/',{username:this.email,password:this.pass}).done(function (data) {
                debugger;
            }).fail(function (data) {
                debugger;
            })
        }
    },
    verificar:function () {
        debugger;
        this.email = this.$('#form_email').val()
        this.pass = this.$('#form_pass').val()
        if (this.email === '') {
            this.$('.form_login').addClass('has-error').removeClass('has-success');
        }else{
            this.$('.form_login').removeClass('has-error').addClass('has-success');
        }
        if (this.pass==='') {
            this.$('.form_pass').addClass('has-error').removeClass('has-success');
        }else{
            this.$('.form_pass').removeClass('has-error').addClass('has-success');            
        }
        if (this.email==='') {
            return false
        }
        if (this.pass==='') {
            return false
        }
        return true
    }
});