const {Schema, model} = require('mongoose');
//Clase, tipó declarativo
//Definicion del esquema para la coleccion de TipoPelicula
//
const TipoPeliSchema = Schema({
    titulo:{
        type: String,
        require: true
    },
    categoria:{
        type: String,
        require: true,
    }
},{ collection: 'TipoPelis'});
//Configuración opcional para cambiar el id por Uid
//Este cambio es solo para fines visuales en BD
TipoPeliSchema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})
//Se ha creado el shena, ahora necesitamos inplementar el modelo
//Se exporta el modelo
//Por defecto moongose creara en mongodb un documento en plural: usuarios
module.exports = model ('TipoPelicula', TipoPeliSchema);
