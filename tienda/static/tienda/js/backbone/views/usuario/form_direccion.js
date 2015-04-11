Loviz.Views.Form_direccion = Backbone.View.extend({
    tagName:'form',
    template: swig.compile($("#nueva_direccion_template").html()),
    events: {
        'change #departamento_envio':'cambiar_provicias',
        'change #provincia_envio':'cambiar_distritos',
        'submit':'crear_direcion',
    },    
    initialize: function () {
    	this.render();
    },    
    render: function () {
        var html = this.template();
        this.$el.html(html);        
        this.addDepartamentos();
    },
    addDepartamentos:function () {
        var self = this;
        this.depas = new Loviz.Collections.Ubigeos();
        this.depas.fetch().done(function () {
            self.depas.forEach(function (depa) {
                var opcion = '<option value="'+depa.toJSON().id+'">'+depa.toJSON().name+'</option>';
                self.$('#departamento_envio').append(opcion);
            });
        })
    },
    cambiar_provicias:function () {
        var self = this;
        this.$('#provincia_envio').empty();
        var depa = this.$('#departamento_envio').val();
        this.regiones = new Loviz.Collections.Ubigeos();

        var opcion = '<option value="" select>Selecciona una provincia</option>';
        self.$('#provincia_envio').append(opcion);

        this.regiones.fetch({
            data:$.param({region:depa})
        }).done(function () {
           self.regiones.forEach(function (depa) {
                var opcion = '<option value="'+depa.toJSON().id+'">'+depa.toJSON().name+'</option>';
                self.$('#provincia_envio').append(opcion);
            }); 
        })
    },
    cambiar_distritos:function () {
        var self = this;
        this.$('#distrito_envio').empty();
        var provincia = this.$('#provincia_envio').val();
        this.provincias = new Loviz.Collections.Ubigeos();
        var opcion = '<option value="" select>Selecciona una provincia</option>';
        self.$('#distrito_envio').append(opcion);

        this.provincias.fetch({
            data:$.param({region:provincia})
        }).done(function () {
            self.provincias.forEach(function (depa) {
                var opcion = '<option value="'+depa.toJSON().id+'">'+depa.toJSON().name+'</option>';
                self.$('#distrito_envio').append(opcion);
            }); 
        })
    },
    crear_direcion:function (e) {
        e.preventDefault();        
        var verificar = this.verificar();
        if (verificar===true) {
            var departamento = $('#departamento_envio').val();
            var provincia = $('#provincia_envio').val();
            departamento = this.depas.get(departamento);
            provincia = this.provincias.get(provincia);

            var modelo = new Loviz.Models.Direccion();
            modelo.set({
                usuario:window.models.usuario.id,
                tipo : 'envio',
                departamento:departamento,
                provincia:provincia,
                distrito:$('#distrito_envio').val(),
                direccion : $('#direccion_envio').val(),
                telefono : $('#telefono_envio')
            });
            debugger;
        }
    },
    verificar:function () {
        this.$('.form-control').each(function () {
            var valor = $(this).val();
            if (valor==='') {
                $(this.parentNode).addClass('has-error').removeClass('has-success');
                return false;
            }else{
                $(this.parentNode).addClass('has-success').removeClass('has-error');
            }
        });
        return true;
    }
});