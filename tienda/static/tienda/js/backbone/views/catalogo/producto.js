Loviz.Views.Producto = Backbone.View.extend({
    tagName: 'article',
    className: 'producto',
    events: {
    },
    template: swig.compile($("#producto_lista_template").html()),
    
    initialize: function () {
        this.quick =false;
        this.listenTo(this.model, "change", this.verificar_visible, this);
    },    
    render: function () {
        var album = this.model.toJSON()
        var html = this.template(album);
        this.$el.html(html);
        this.estilos();
        this.add_estrellas();
        return this;
    },
    navegar_producto : function () {
        if (this.quick = false) {
            window.routers.catalogo.navigate('/producto/'+this.model.toJSON().slug, {trigger:true});
        };
        this.quick = false
    },
    add_estrellas:function () {
        var estrellas = new Loviz.Views.Estrellas({model:this.model});
        this.$('.estrellas').append(estrellas.$el);        
    },
    estilos:function () {
        if (window.app.slug==='catalogo') {
            this.$el.addClass('col-md-4 col-xs-6');
        };
    },
    verificar_visible:function () {
        if (this.model.toJSON().visible===true) {
            this.$el.fadeIn();
        }else{
            this.$el.fadeOut();
        }
    }
});