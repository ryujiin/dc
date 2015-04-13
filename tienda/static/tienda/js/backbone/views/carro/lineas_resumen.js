Loviz.Views.Linea_resumen = Backbone.View.extend({
    className: 'linea_resumen',
    events: {
    },
    template: swig.compile($("#linea_resumen_template").html()),
    
    initialize: function () {
    },    
    render: function () {
        var album = this.model.toJSON()
        var html = this.template(album);
        this.$el.html(html);
        return this;
    },
});