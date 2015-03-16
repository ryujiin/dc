Loviz.Views.Slider_Home = Backbone.View.extend({
    className: 'slide',
    events: {
    },
    template: swig.compile($("#slider_home_template").html()),
    
    initialize: function () {
    },    
    render: function () {
        var album = this.model.toJSON()
        var html = this.template(album);
        this.$el.html(html);
        return this;
    },
});