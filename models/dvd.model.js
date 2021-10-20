const {Schema, model, SchemaTypes} = require('mongoose');

const DvdSchema = Schema({
    numCopias:{
        type: String,
        required: true
    },
    formato:{
        type: String
    },
    pelicula:{
        required: true,
        type: Schema.Types.ObjectId,
        ref:'Peli'
    }   
},{ collection: 'Dvds'});

DvdSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Dvd', DvdSchema);