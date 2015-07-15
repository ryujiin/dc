Loviz.Views.Num_items = Backbone.View.extend({
    template: swig.compile($("#num_items_template").html()),
    events: {
    },
    initialize: function () {
        this.listenTo(this.model, "change", this.render, this);         
    },    
    render: function () {
        var album = this.model.toJSON();
        var html = this.template(album);
        this.$el.html(html);
        return this;
    },
});