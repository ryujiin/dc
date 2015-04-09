Loviz.Models.Carro = Backbone.Model.extend({
	urlRoot : '/api/carro/',
	name : 'Carro',
    url : function() {
        var base = this.urlRoot;
        if (this.isNew()) return base;
        return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id+'/';
    },
	initialize : function () {
        //this.buscar_carro();
        //En el modelo usuario hay un condicional cuando falla la busqueda
        this.listenTo(window.models.usuario, "change", this.buscar_carrologin, this);
	},
    defaults:{
        "propietario": null, 
        "estado": "Abierto", 
        "sesion_carro": '', 
        "lineas": 0, 
        "total": "0.00", 
        "subtotal": "0.00", 
        "envio": 0
    },
    buscar_carrologin:function () {
        var self = this;
        var carrito =storage.get('carro');
        this.fetch()
        .fail(function () {
            self.set('propietario',window.models.usuario.id)
            if (carrito!==null) {
                self.carrolocal();
            };
        }).done(function () {
            if (carrito!==null) {
                self.carrolocal();
            };
        });
    },
	buscar_carro:function () {
        var self = this;
        var carrito = storage.get('carro');
        this.fetch({
            data:$.param({session:galleta})
        }).done(function (data) {
        }).fail(function () {
            self.set('sesion_carro',galleta);
        })
    },
    fucionar_carro:function(carro_id){
        debugger;
        var self = this;
        $.localStorage.remove('carro');
        var user = $.sessionStorage.get('usuario');
        //Fucionar carro Local con el servidor
        //verifico si el carro local fue salvado
        var nueva_collecion = new Loviz.Collections.Lineas();
        nueva_collecion.fetch({
            data:$.param({carro:carro_id})
        })
        .done(function () {
            nueva_collecion.forEach(function (linea) {
                linea.set('carro',self.id);
                linea.save();
            });
            //me quedo con el carro del servidor
            
            var carro_fucion = new Loviz.Models.Carro({id:carro_id});
            
            carro_fucion.set({'estado':'Fusionada','propietario':user});
            carro_fucion.save().done(function () {
                window.models.carro.fetch().done(function () {
                });
            });
        });
    },
    carrolocal:function () {
        var self = this;
        var idcarro = storage.get('carro');
        var nueva_collecion = new Loviz.Collections.Lineas();
        this.save()
        .done(function (data) {
            nueva_collecion.fetch({
                data:$.param({carro:idcarro})
            }).done(function () {
                nueva_collecion.forEach(function (linea) {
                    linea.set('carro',self.id);
                    linea.save();
                });
                var carro_fucion = new Loviz.Models.Carro({id:idcarro});
            
                carro_fucion.set({'estado':'Fusionada','propietario':window.models.usuario.id});
                
                carro_fucion.save().done(function () {
                    window.models.carro.fetch();
                });
                storage.remove('carro');
            }).fail(function () {
            })
        })
    }
});