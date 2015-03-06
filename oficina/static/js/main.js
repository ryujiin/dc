$(document).ready(function(){
	console.log('funciona');

    window.routers.base = new Oficina.Routers.Base();

    window.collections.productos_lista = new Oficina.Collections.Productos();

    window.views.pagina = new Oficina.Views.Pagina( $('body') );

	Backbone.history.start({
        pushState:true,
    });
});