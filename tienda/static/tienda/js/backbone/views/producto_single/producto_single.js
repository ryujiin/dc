Loviz.Views.Producto_single = Backbone.View.extend({
    el:$('#producto_single'),
	events: {
        'change .talla' : 'talla_seleccionada',
        'click .addcart':'addcart',
    },
    template: swig.compile($("#producto_single_template").html()),
    initialize: function () {
        var self = this;
	    this.listenTo(this.model, "change", this.render, this);
        window.routers.base.on('route',function(e){
            self.aparecer(e);
        });
    },    
    render: function () {
        var album = this.model.toJSON()
        var html = this.template(album);
        this.$el.html(html);
        this.generar_galeria();
        this.add_estrellas();
    },
    aparecer:function (e) {
        if (e!=='producto_single') {
            this.$el.slideUp('slow')
        }else{
            this.$el.slideDown('slow')
        }
    },
    generar_galeria:function () {
        var galeria = new Loviz.Views.Galeria_producto_single({
            model:this.model
        });
        var galeria_movil = new Loviz.Views.Galeria_movil({
            model:this.model
        })
    },
    talla_seleccionada:function (e) {
        this.$('.precios_single .variacion').removeClass('visible');
        this.$('.precios_single .'+e.target.value).addClass('visible');
    },
    add_estrellas:function () {
        var estrellas = new Loviz.Views.Estrellas({model:this.model});
        this.$('.estrellas').append(estrellas.$el);
    },
    addcart:function (e) {
        e.preventDefault();
        var linea = new Loviz.Models.Linea();
        var produ = this.model.toJSON().id;
        var varia = this.$('.formulario_producto .talla').val();
        if (varia !=='') {
            var carro = window.models.carro.toJSON().id;
            if (carro ===undefined) {
                window.models.carro.save()
                .done(function (data) {
                    linea.set({carro:data.id,producto:produ,variacion:varia,cantidad:1});
                    linea.save().done(function () {
                        var miniline = new Loviz.Views.Linea_addcart({model:linea})
                        window.models.carro.fetch().done(function (data) {
                        })
                    })
                })
            }else{
                linea.set({carro:carro,producto:produ,variacion:varia,cantidad:1});
                linea.save().done(function () {
                    var miniline = new Loviz.Views.Linea_addcart({model:linea})
                    window.models.carro.fetch();
                })
            }
        }else{
            this.elige_talla();
        }
    },
    elige_talla:function () {
        this.$('.talla_form .texto_ayuda').fadeIn('slow').delay(2000).fadeOut('slow');
        this.$('.talla_form').addClass('has-error');
    },
});