Loviz.Views.Form_nuevo_user = Backbone.View.extend({
    tagName:'form',
    template: swig.compile($("#form_nuevo_user_template").html()),    
    events: {
        'submit':'login',
    },    
    initialize: function () {
    	this.render();
    },    
    render: function () {
        var html = this.template();
        this.$el.html(html);
    },
    login:function (e) {
        e.preventDefault();
        var verificar = this.verificar();
        if (verificar === true) {
            $.post('/ajax/login/',function (data) {
                debugger;
            })
        }
    },
});