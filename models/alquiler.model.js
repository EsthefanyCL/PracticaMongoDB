const {Schema, model} = require('mongoose');

const AlquilerSchema = Schema({

    fecha_alquiler:{
        type: String,
        required: true
    },
    fecha_devolucion:{
        type: String,
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
    },
    Dvd:{
        required: true,
        type: Schema.Types.ObjectId,
        ref:'Dvd'
    }
},{ collection: 'alquileres'});

AlquilerSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Alquiler', AlquilerSchema);