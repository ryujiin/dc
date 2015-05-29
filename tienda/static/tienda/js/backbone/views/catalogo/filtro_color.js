Loviz.Views.Filtro_colores = Backbone.View.extend({
    events: {
    },
    template: swig.compile($("#link_refinamiento_template").html()),
    
    initialize: function () {
    },
    
    render: function () {
        var album = this.model.toJSON();
        var html = this.template(album);
        this.$el.html(html);
        return this;
    },
});