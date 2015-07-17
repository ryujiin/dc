$(document).ready(function(){
	console.log('entienda');
    
    storage=$.localStorage;

    window.routers.base =  new Loviz.Routers.Base();
    
    window.views.tienda = new Loviz.Views.Tienda();
    galleta = window.views.tienda.obt_galleta();

    //Modelos
    window.models.usuario = new Loviz.Models.Usuario();    
    window.models.carro = new Loviz.Models.Carro();
    window.models.pedido = new Loviz.Models.Pedido();

    //Colleciones
    window.collections.sliderHome = new Loviz.Collections.SliderHomes();
    window.collections.categorias = new Loviz.Collections.Categorias();
    window.collections.producto_single = new Loviz.Collections.Productos_Single();
    window.collections.favoritos = new Loviz.Collections.Favoritos();
    window.collections.direcciones = new Loviz.Collections.Direcciones();
    window.collections.metodos = new Loviz.Collections.Envios();
    window.collections.pedidos = new Loviz.Collections.Pedidos();
    window.collections.colores = new Loviz.Collections.Colores();
    window.collections.estados_pedidos = new Loviz.Collections.Estados_pedidos();

    //Views
    $('#caja_ajax').show();
    window.collections.sliderHome.fetch().done(function () {
        window.collections.categorias.fetch().done(function () {
            window.collections.metodos.fetch().done(function () {
                window.collections.colores.fetch().done(function () {
                    window.collections.estados_pedidos.fetch().done(function () {
                        iniciar_vistas();
                        $('#caja_ajax').hide();
                        Backbone.history.start({
                            pushState:true,
                        });    
                    })                    
                })
            })
        })
    });

    function iniciar_vistas () {
        window.views.home = new Loviz.Views.Home();
        window.views.mini_carro = new Loviz.Views.Mini_carro({
            model:window.models.carro
        });
        window.views.producto_single = new Loviz.Views.Producto_single({
            model:new Loviz.Models.Producto_Single()
        });
        window.views.carro = new Loviz.Views.Carro({
            model:window.models.carro
        });
        window.views.pagar = new Loviz.Views.Pagar({
            model:window.models.pedido
        });
        window.views.usuario = new Loviz.Views.Usuario({
            model: window.models.usuario
        })
        /*
        window.views.user_mini = new Loviz.Views.Mini_user({
            model:window.models.usuario,
            el:$('#usuario_mini'),
        });
        window.views.user_mini_movil = new Loviz.Views.Mini_user({
            model:window.models.usuario,
            el:$('#mini_user_movil'),
        });
        window.views.navegador = new Loviz.Views.Navegador();   
*/
    }


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