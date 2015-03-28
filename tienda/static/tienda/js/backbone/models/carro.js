Loviz.Models.Carro = Backbone.Model.extend({
	urlRoot : '/api/carro/',
	name : 'Carro',
    url : function() {
        var base = this.urlRoot;
        if (this.isNew()) return base;
        return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id+'/';
    },
	initialize : function () {
        //En el modelo usuario hay un condicional cuando falla la busqueda
        this.listenToOnce(window.models.usuario, "change", this.buscar_carro, this);
	},
    defaults:{
        "propietario": null, 
        "estado": "Abierto", 
        "sesion_carro": "", 
        "lineas": 0, 
        "total": "0.00", 
        "subtotal": "0.00", 
        "envio": 0
    },
	buscar_carro:function () {
        var self = this;
        var carrito = $.localStorage.get('carro')
        var usuario = window.models.usuario.toJSON().id
        if (usuario>0) {
            this.fetch()
            .fail(function () {
                self.set('propietario',usuario);
                if (carrito!=null) {
                    self.carro_local(carrito);
                };
            })
            .done(function () {
                if (carrito !=null) {
                    self.fucionar_carro(carrito);
                };
            })
        }else{
            this.fetch({
                data:$.param({session:galleta})
            }).fail(function () {
                self.set('sesion_carro',galleta)
                if (carrito!=null) {
                    self.carro_local(carrito);
                };
            }).done(function () {
                if (carrito !=null) {
                    self.fucionar_carro(carrito);
                };
            })
        }
    },
    fucionar_carro:function(carro_id){
        var self = this;
        $.localStorage.remove('carro');
        var user = $.sessionStorage.get('usuario');
        //Fucionar carro Local con el servidor
        //verifico si el carro local fue salvado
        debugger;
        var nueva_collecion = new Loviz.Collections.Lineas();
        nueva_collecion.fetch({
            data:$.param({carro:carro_id})
        })
        .done(function () {
            debugger;
            nueva_collecion.forEach(function (linea) {
                debugger;
                linea.set('carro',self.id);
                linea.save();
            });
            //me quedo con el carro del servidor
            
            var carro_fucion = new Loviz.Models.Carro({id:carro_id});
            
            carro_fucion.set({'estado':'Fusionada','propietario':user});
            debugger;
            carro_fucion.save().done(function () {
                debugger;
                window.models.carro.fetch().done(function () {
                    debugger;
                });
            });
        });
    },
    carro_local:function (carrito) {
        $.localStorage.remove('carro');
        debugger;
        var self = this;
        carro_id=carrito
        var user = $.sessionStorage.get('usuario');
        this.save().done(function () {
            debugger;
            var nueva_collecion = new Loviz.Collections.Lineas();
            nueva_collecion.fetch({
                data:$.param({carro:carro_id})
            }).done(function () {
                debugger;
                nueva_collecion.forEach(function (linea) {                
                    linea.set('carro',self.id);
                    linea.save();
                });
                debugger;
                 var carro_fucion = new Loviz.Models.Carro({id:carro_id});
            
                carro_fucion.set({'estado':'Fusionada','propietario':user});
                
                carro_fucion.save().done(function () {
                    window.models.carro.fetch();
                    debugger;
                });
            })
        })
    }
});