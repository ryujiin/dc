Loviz.Views.Linea_carro = Backbone.View.extend({
    className: 'linea',
    events: {
        'click .mas_produ': 'mas_productos',
        'click .menos_produ': 'menos_productos',
    },
    template: swig.compile($("#lineas_carro_template").html()),
    
    initialize: function () {
        this.quick =false;
        this.listenTo(this.model, "change", this.render, this);        
    },    
    render: function () {
        var album = this.model.toJSON()
        var html = this.template(album);
        this.$el.html(html);
        return this;
    },
    borrar_linea:function () {
        this.$el.fadeOut('slow');
        this.model.destroy();
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
        var cantidad = this.model.toJSON().cantidad;
        this.model.set('cantidad',cantidad+1)
        this.model.save().done(function () {
            window.models.carro.fetch()
        })
    },
    menos_productos:function () {
        var self=this;
        var cantidad = this.model.toJSON().cantidad;
        this.model.set('cantidad',cantidad-1)
        this.model.save().done(function () {
            window.models.carro.fetch()
            if (self.model.toJSON().cantidad===0) {
                self.borrar_linea();
            };            
        });
    },
});