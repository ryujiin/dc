Loviz.Views.Direccion = Backbone.View.extend({
    className: 'radio col-md-6 col-sm-6',
    events: {
    },
    template: swig.compile($("#direccion_template").html()),
    
    initialize: function () {
        this.render();
    },    
    render: function () {
        var album = this.model.toJSON()
        var html = this.template(album);
        this.$el.html(html);
        return this;
    },
});