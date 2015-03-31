Loviz.Views.Linea_carro = Backbone.View.extend({
    tagName: 'tr',
    className: 'linea',
    events: {
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
        this.model.destroy().done(function () {
            window.models.carro.fetch();
        });
    },
    aumentar_cantidad:function () {
        this.$('.up').hide();
        var numero = parseInt(this.$('.cantidad_num').val());
        numero++
        this.model.set('cantidad',numero)
        this.model.save().done(function () {
            window.models.carro.fetch();
        })
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
    }
});