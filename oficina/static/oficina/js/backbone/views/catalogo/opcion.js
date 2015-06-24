Oficina.Views.Opcion = Backbone.View.extend({
    tagName:'option',
    events: {
    },
    template: swig.compile($("#formu_select_template").html()),
    
    initialize: function () {
        this.render();
    },    
    render: function () {
        var opcion = this.model.toJSON()
        var html = this.template(opcion);
        this.$el.html(html);
        return this;
    },
});