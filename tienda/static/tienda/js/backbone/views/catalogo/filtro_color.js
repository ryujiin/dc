Loviz.Views.Filtro_colores = Backbone.View.extend({
    tagName:'li',
    events: {
    },
    template: swig.compile($("#link_refinamiento_template").html()),
    
    initialize: function () {
        this.render();
    },
    
    render: function () {
        var album = this.model.toJSON();
        var html = this.template(album);
        this.$el.html(html);
        return this;
    },
});