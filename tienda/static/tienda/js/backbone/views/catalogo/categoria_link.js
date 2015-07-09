Loviz.Views.Categoria_link = Backbone.View.extend({
    tagName: 'li',
    className: 'categoria_link',
    events: {
    },
    template: swig.compile($("#link_categoria_template").html()),
    
    initialize: function () {
    },
    
    render: function () {
        var album = this.model.toJSON();
        var html = this.template(album);
        this.$el.html(html);
        return this;
    },
});