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
        //Si tengo el carrito lleno antes de logarme
        if (window.models.carro.id!==undefined) {
            var nuevo_carro = new Loviz.Models.Carro();
            nuevo_carro.fetch().done(function () {
                self.carro_fucionar(nuevo_carro);
            }).fail(function () {
                self.set('propietario',window.models.usuario.id)
            })
        }else{
            //Cuando estoy logueado solo busco mi carrito
            this.fetch().fail(function () {
                //Esto cuando no hay un carrito en el servidor
                 self.set('propietario',window.models.usuario.id)
            }).done(function () {
                //Esto es cuando hay un carrito en mi server
            })
        }
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
    carro_fucionar:function (carro_server) {
        var self =this;
        var id_server = carro_server.id;
        var id_local = window.models.carro.id;
        var lineas_carro_server = new Loviz.Collections.Lineas();
        //Busco lineas del carro_server
        lineas_carro_server.fetch({
            data:$.param({carro:id_server})
        }).done(function () {
            //cambio las lineas del carro_server al local
            lineas_carro_server.forEach(function (linea) {
                linea.set('carro',self.id);
                linea.save();
            });
            //Mato el carro en el server
            carro_server.set('estado','Fusionada')
            carro_server.save().done(function () {
                self.set('propietario',window.models.usuario.id);
                self.save().done(function () {
                    debugger;
                }).fail(function () {
                    debugger;
                })
            })
        })
    }
});