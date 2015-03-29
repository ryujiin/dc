Loviz.Views.Producto_single = Backbone.View.extend({
    el:$('#producto_single'),
	events: {
        'change .talla' : 'talla_seleccionada',
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
    },
    talla_seleccionada:function (e) {
        this.$('.precios_single .variacion').removeClass('visible');
        this.$('.precios_single .'+e.target.value).addClass('visible');
    },
    add_estrellas:function () {
        var estrellas = new Loviz.Views.Estrellas({model:this.model});
        this.$('.estrellas').append(estrellas.$el);
    }
});