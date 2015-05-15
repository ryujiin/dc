Loviz.Views.Menu_inferior = Backbone.View.extend({
    className: 'radio col-md-6 col-sm-6',
    events: {
    },
    template: swig.compile($("#direccion_template").html()),
    
    initialize: function ($el) {
        this.el = $el;
    },
});