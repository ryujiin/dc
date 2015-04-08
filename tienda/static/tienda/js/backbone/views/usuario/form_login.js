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
        $('#caja_ajax').show();
        var self=this;
        e.preventDefault();
        var verificar = this.verificar();
        if (verificar === true) {
            $.post('/ajax/login/',{username:this.email,password:this.pass})
            .done(function (data) {
                $('#caja_ajax').hide();
                if (data.error_message!=='') {
                    self.$('.bg-warning').hide();
                    var error = '<p class="bg-warning">'+data.error_message+'</p>';
                    self.$el.prepend(error);
                    self.$('#form_email').val('')
                    self.$('#form_pass').val('')
                    self.verificar();
                }else{
                    debugger;
                }
            }).fail(function (data) {
                debugger;
            })
        }
    },
    verificar:function () {
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