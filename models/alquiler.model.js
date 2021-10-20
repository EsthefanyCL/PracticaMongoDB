const {Schema, model} = require('mongoose');

const AlquilerSchema = Schema({

    fecha_alquiler:{
        type: Date,
        required: true
    },
    fecha_devolucion:{
        type: Date,
    },
    valor:{
        type: Number,
        required: true
    },
    cantidad:{
        type: Number,
        required: true
        },
    usuario:{
        required: true,
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    }
},{ collection: 'alquileres'});

AlquilerSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Alquiler', AlquilerSchema);