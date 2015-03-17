Loviz.Views.Breadcrumb = Backbone.View.extend({
	events: {
	},
	initialize : function (categoria) {
		this.$el = $('#breadcrumb');
		this.llenar_bread(categoria);
	},
	render:function () {
	},
	llenar_bread:function (categoria) {
		var cate = window.collections.categorias.findWhere({slug:categoria});
		var link = '<li class="active">'+cate.toJSON().nombre+'</li>';
		this.$el.prepend(link);
		this.verificar_padre(cate)
	},
	verificar_padre:function (cate) {
		if (cate.toJSON().padre !==null) {
			var cate = window.collections.categorias.findWhere({slug:cate.toJSON().padre});
			this.llenar_otro_link(cate);
		}else{
			var link = '<li><a href="/" class="link">Home</a></li>'
			this.$el.prepend(link);
		}
	},
	llenar_otro_link:function (cate) {
		var link = '<li><a class="link" href="/catalogo/'+cate.toJSON().slug+'/">'+cate.toJSON().nombre+'</a></li>'
		this.$el.prepend(link);
		this.verificar_padre(cate);
	}
});
