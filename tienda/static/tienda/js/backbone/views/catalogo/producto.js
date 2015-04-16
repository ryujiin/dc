Loviz.Views.Producto = Backbone.View.extend({
    tagName: 'article',
    className: 'col-sm-4 col-xs-6 producto',
    events: {
    },
    template: swig.compile($("#producto_lista_template").html()),
    
    initialize: function () {
        this.quick =false;
    },
    
    render: function () {
        var album = this.model.toJSON()
        var html = this.template(album);
        this.$el.html(html);
        this.add_loved_icono();
        this.add_estrellas();
        return this;
    },
    navegar_producto : function () {
        if (this.quick = false) {
            window.routers.catalogo.navigate('/producto/'+this.model.toJSON().slug, {trigger:true});
        };
        this.quick = false
    },
    add_loved_icono:function(){
        var icono = new Loviz.Views.LovedIcono({model:this.model});
        this.$('.icono_loved').append(icono.$el);
        var favorito = window.collections.favoritos.findWhere({producto:this.model.id})
        if (favorito!==undefined) {
            icono.favorito_check();
        };
    },
    add_estrellas:function () {
        var estrellas = new Loviz.Views.Estrellas({model:this.model});
        this.$('.estrellas').append(estrellas.$el);
    }
});