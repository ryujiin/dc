Oficina.Views.Producto_lista = Backbone.View.extend({
    tagName: 'tr',
    className: 'producto',
    events: {
    },
    template: swig.compile($("#producto_lista_template").html()),
    
    initialize: function () {
    },    
    render: function () {
        var album = this.model.toJSON()
        var html = this.template(album);
        this.$el.html(html);
        return this;
    },
});