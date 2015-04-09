Loviz.Views.Form_nuevo_user = Backbone.View.extend({
    tagName:'form',
    template: swig.compile($("#form_nuevo_user_template").html()),    
    events: {
        'submit':'enviar_registro',
    },    
    initialize: function () {
    	this.render();
    },    
    render: function () {
        var html = this.template();
        this.$el.html(html);
    },
    enviar_registro:function (e) {
        e.preventDefault();
        var self = this;
        var verificar = this.verificar();
        if (verificar === true) {
            $.post('/ajax/crear/',{username:this.email,password:this.pass})
            .done(function (data) {
                if (data.creado===true) {
                    $.post('/ajax/login/',{username:self.email,password:self.pass})
                    .done(function (data) {
                        window.models.usuario.fetch();
                    }).fail(function (data) {
                        self.error_crear()
                    })
                };
            }).fail(function (data) {
                self.error_crear()
            })
        }
    },
    verificar:function () {
        this.email = $('#nuevo_user_email').val();
        this.email2 = $('#nuevo_user_email2').val();
        this.pass = $('#pass_nuevo').val();
        this.pass2 = $('#pass_nuevo2').val();
        //Verificar si es vacio
        this.$('input').each(function () {
            var valor = $(this).val();
            if (valor==='') {
                $(this.parentNode).addClass('has-error').removeClass('has-success');
            }else{
                $(this.parentNode).addClass('has-success').removeClass('has-error');
            }
        })
        //igual email
        if (this.email2!==this.email) {
            this.email_warning();
            return false
        }else{
            this.emailok();
        }
        //igual pass
        if (this.pass2!==this.pass) {
            this.pass_warning();
            return false
        }else{
            this.passok();
        }
        if (this.email2 !=='' && this.email !=='' && this.pass2 !=='' && this.pass !=='') {
            return true
        }else{
            return false
        }
    },
    email_warning:function () {
        this.$('input[type=email]').each(function () {
            $(this.parentNode).addClass('has-warning').removeClass('has-success');
        })
    },
    emailok:function () {
        this.$('input[type=email]').each(function () {
            $(this.parentNode).removeClass('has-warning').addClass('has-success');
        })
    },
    pass_warning:function () {
        this.$('input[type=password]').each(function () {
            $(this.parentNode).addClass('has-warning').removeClass('has-success');
            $(this).val('');
        })
    },
    passok:function () {
        this.$('input[type=password]').each(function () {
            $(this.parentNode).removeClass('has-warning').addClass('has-success');
        })
    },
    error_crear:function () {
        var error = '<p class="bg-warning">Lo sentimos parece que ya existe un usuario usando ese correo electronico</p>';
        this.$el.prepend(error);
        this.$('input').each(function () {
            $(this).val('')
        })
    }
});