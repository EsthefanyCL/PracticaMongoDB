const {Schema, model} = require('mongoose');

const AutorSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    fecha_nacimiento:{
        type: String,
    }    
},{ collection: 'autores'});

AutorSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model('Autor', AutorSchema);