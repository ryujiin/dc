Loviz.Views.Linea_carro = Backbone.View.extend({
    className: 'linea',
    events: {
        'click .mas_produ': 'mas_productos',
        'click .menos_produ': 'menos_productos',
        'click .eliminar':'borrar_linea',
    },
    template: swig.compile($("#lineas_carro_template").html()),
    template_pagar: swig.compile($("#linea_resumen_template").html()),
    
    initialize: function () {
        //this.listenTo(this.model, "change", this.render, this);        
        this.render();
    },    
    render: function () {
        var album = this.model.toJSON()
        if (window.app.slug==='carro') {
            var html = this.template(album);
        }else{
            var html = this.template_pagar(album);
        }
        this.$el.html(html);
        return this;
    },
    borrar_linea:function () {
        this.$el.fadeOut('slow');
        this.model.destroy().done(function () {
            window.models.carro.fetch();
        });
    },
    reducir_cantidad:function () {
        this.$('.down').hide();        
        var numero = parseInt(this.$('.cantidad_num').val());
        if (numero>1) {
            numero--
            this.model.set('cantidad',numero)
            this.model.save().done(function () {
                window.models.carro.fetch();
            })
        };
    },
    mas_productos:function () {
        var self = this;
        this.cargando_cantidad();
        var cantidad = this.model.toJSON().cantidad;
        this.model.set('cantidad',cantidad+1);
        this.model.save().done(function () {
            self.render();
            window.models.carro.fetch()
        })
    },
    menos_productos:function () {
        this.cargando_cantidad();        
        var self=this;
        var cantidad = this.model.toJSON().cantidad;
        this.model.set('cantidad',cantidad-1)
        this.model.save().done(function () {
            self.render();
            window.models.carro.fetch()
            if (self.model.toJSON().cantidad===0) {
                self.borrar_linea();
            };            
        });
    },
    cargando_cantidad:function () {
        this.$('.cargando').fadeIn('fast');
    }
});