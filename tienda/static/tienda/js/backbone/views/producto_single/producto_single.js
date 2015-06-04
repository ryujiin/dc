Loviz.Views.Producto_single = Backbone.View.extend({
    el:$('#main'),
    className:'producto_single',
	events: {
        'change .talla' : 'talla_seleccionada',
        'click .addcart':'addcart',
    },
    template: swig.compile($("#producto_single_template").html()),
    initialize: function () {
        var self = this;
	    this.listenTo(this.model, "change", this.render, this);
    },    
    render: function () {
        var album = this.model.toJSON()
        var html = this.template(album);
        this.$el.html(html);
        this.$el.addClass('producto_single');
        this.generar_galeria();
        this.add_estrellas();
        this.add_comentarios();
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
                            storage.set('carro',data.id);
                        })
                    })
                })
            }else{
                linea.set({carro:carro,producto:produ,variacion:varia,cantidad:1});
                linea.save().done(function () {
                    var miniline = new Loviz.Views.Linea_addcart({model:linea})
                    window.models.carro.fetch()
                    .done(function (data) {
                        if (storage.get('carro')===null) {
                            storage.set('carro',data.id);
                        };
                    });
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
    add_comentarios:function () {
        var self = this;
        this.comentarios = new Loviz.Collections.Comentarios();
        this.comentarios.fetch({
            data:$.param({producto:this.model.id})
        }).done(function () {
            if (self.comentarios.length>0) {
                self.comentarios.forEach(self.add_coment,self)
                self.$('.sin_comentarios').empty()                
            }else{
                self.$('#comentarios .add_coment').hide()
            }
        })
    },
    add_coment:function (modelo) {
        var vista = new Loviz.Views.Comentario({model:modelo});
        this.$('#comentarios').append(vista.$el);
    }
});