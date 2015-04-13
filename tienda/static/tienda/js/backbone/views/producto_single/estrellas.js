Loviz.Views.Estrellas = Backbone.View.extend({
    template:swig.compile($("#estrellas_template").html()),    
	events: {
    },
    initialize: function () {
        this.render();
        this.add_estrella();
    },
    render: function () {
		var html = this.template();
        this.$el.html(html);
    },
    add_estrella:function () {
        var valor = this.model.toJSON().valoracion;
        valor = parseFloat(valor.toFixed(1));
        this.$('span').each(function(i,v){
            if (valor<=i) {
                $(v).addClass('icon-star4 color-plomo');
            }else{
                $(v).addClass('icon-star4 color-aguamarina');
            }
        });
    },

});