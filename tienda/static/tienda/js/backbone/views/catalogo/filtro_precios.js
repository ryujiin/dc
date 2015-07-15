Loviz.Views.Filtro_Precios = Backbone.View.extend({
    events: {
    },
    initialize: function () {        
    },    
    render: function () {
        var album = this.model.toJSON();
        var html = this.template(album);
        this.$el.html(html);
        return this;
    },
});