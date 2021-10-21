const {Schema, model, SchemaTypes} = require('mongoose');

const PeliculaSchema = Schema({
    autor:{
        required: true,
        type: Schema.Types.ObjectId,
        ref:'Autor'
    },
    tipoPeli:{
        required: true,
        type: Schema.Types.ObjectId,
        ref:'TipoPelicula'
    }
      
},{ collection: 'peliculas'});

PeliculaSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Peli', PeliculaSchema);