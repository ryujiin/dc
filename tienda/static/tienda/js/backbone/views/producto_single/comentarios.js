Loviz.Views.Comentario = Backbone.View.extend({
    tagName: 'article',
    className: 'comentario_producto',
    events: {
    },
    template: swig.compile($("#comentarios_template").html()),
    
    initialize: function () {
        this.render();
    },
    
    render: function () {
        var album = this.model.toJSON()
        var html = this.template(album);
        this.$el.html(html);
        //this.add_estrellas();
        return this;
    },
    add_estrellas:function () {
        var estrellas = new Loviz.Views.Estrellas({model:this.model});
        this.$('.estrellas').append(estrellas.$el);
    }
});