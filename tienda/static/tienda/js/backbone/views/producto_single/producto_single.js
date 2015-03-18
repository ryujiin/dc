Loviz.Views.Producto_single = Backbone.View.extend({
    el:$('#producto_single'),
	events: {
    },
    template: swig.compile($("#producto_single_template").html()),
    initialize: function () {
        var self = this;
	    this.listenTo(this.model, "change", this.render, this);
        window.routers.base.on('route',function(e){
            self.aparecer(e);
        });
    },    
    render: function () {
        var album = this.model.toJSON()
        var html = this.template(album);
        this.$el.html(html);
    },
    aparecer:function (e) {
        if (e!=='producto_single') {
            this.$el.slideUp('slow')
        }else{
            this.$el.slideDown('slow')
        }
    }
});