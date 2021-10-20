const {Schema, model} = require('mongoose');
//Clase, tipó declarativo
//Definicion del esquema para la coleccion de Usuario
//
const UsuarioSchema = Schema({
    nombre:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    direccion:{
        type: String,
        require:true
    },
    num_celular:{
        type: String,
        require:true
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    }, 
    google:{
        type: Boolean,
        default: false 
    },
});
//Configuración opcional para cambiar el id por Uid
//Este cambio es solo para fines visuales en BD
UsuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})
//Se ha creado el shena, ahora necesitamos inplementar el modelo
//Se exporta el modelo
//Por defecto moongose creara en mongodb un documento en plural: usuarios
module.exports = model ('Usuario', UsuarioSchema);
