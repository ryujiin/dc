Oficina.Views.Firme_lista = Backbone.View.extend({
    tagName: 'tr',
    className: 'firme',
    events: {
    },
    template: swig.compile($("#Firme_lista_template").html()),
    
    initialize: function () {
    },    
    render: function () {
        var album = this.model.toJSON()
        var html = this.template(album);
        this.$el.html(html);
        return this;
    },
});