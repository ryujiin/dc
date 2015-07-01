Loviz.Views.Producto_single = Backbone.View.extend({
    el:$('#main'),
    className:'producto_single',
	events: {
        'change #talla' : 'talla_seleccionada',
        'click .add_cart':'addcart',
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
        this.$('.precios .variacion.visible').removeClass('visible');
        this.$('.precios .variacion.'+e.target.value).addClass('visible');
        this.$('.seccion-add-cart .sin-seleccionar').fadeOut(500);
        this.$('.seccion-add-cart .seleccionado-todo').delay(500).fadeIn();
    },
    add_estrellas:function () {
        var estrellas = new Loviz.Views.Estrellas({model:this.model});
        this.$('.estrellas').append(estrellas.$el);
    },
    addcart:function () {
        var linea_carro = new Loviz.Models.Linea();
        var miniline = new Loviz.Views.Linea_addcart({model:linea_carro});
        var producto_id = this.model.toJSON().id;
        var variacion_id = this.$('#talla').val();

        if (variacion_id!=='') {
            /*el carro no esta gravado en el server y se grava*/
            if (window.models.carro.id===undefined) {
                window.models.carro.save().done(function (data) {
                    linea_carro.set({carro:data.id,producto:producto_id,variacion:variacion_id,cantidad:1});
                    linea_carro.grabando();
                })
            }else{
                linea_carro.set({carro:window.models.carro.id,producto:producto_id,variacion:variacion_id,cantidad:1});
                linea_carro.grabando();
            }
        };
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