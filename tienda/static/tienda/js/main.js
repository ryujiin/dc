$(document).ready(function(){
	console.log('entienda');

    window.routers.base =  new Loviz.Routers.Base();
    window.views.tienda = new Loviz.Views.Tienda();

    window.views.producto_single = new Loviz.Views.Producto_single({
        model:new Loviz.Models.Producto_Single()
    })
    //Modelos
    window.models.usuario = new Loviz.Models.Usuario();    
    //window.models.carro = new Loviz.Models.Carro();    

    //Colleciones
    window.collections.sliderHome = new Loviz.Collections.SliderHomes();
    window.collections.categorias = new Loviz.Collections.Categorias();
    window.collections.producto_single = new Loviz.Collections.Productos_Single();
    window.collections.favoritos = new Loviz.Collections.Favoritos();

    //Views
    window.views.user_ingresar = new Loviz.Views.Ingresar({model:window.models.usuario});

    window.collections.sliderHome.fetch().done(function () {
        window.collections.categorias.fetch().done(function () {
            window.views.navegador = new Loviz.Views.Navegador();
            Backbone.history.start({
                pushState:true,
            });
        })
    })
    //Funcion para el CRF
    function getCookie(name){
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?  
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }    
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                // Only send the token to relative URLs i.e. locally.
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        } 
    });
});