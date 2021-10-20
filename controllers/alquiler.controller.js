const { response } = require('express');
const Alquiler = require('../models/alquiler.model');
const { eliminarUsuario } = require('./usuarios.controller');

const getAlquiler = async(req, res = response) => {
    //const ponente = await Ponente.find();
    //para la paginacion: ponentes/?desde=5 se utiliza & para concatenar parametros
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;
    
    const [alquileres, total] = await Promise.all([
        Alquiler
        .find({}, 'fecha_alquiler fecha_devolucion  valor cantidad usuario')
        .skip(desde) //variable de paginacion
        .limit(limite), // cuantos valores traer
        Alquiler.countDocuments()
    ]);
    res.json({
        ok: true,
        alquileres
    });
}

const crearAlquiler = async(req, res = response) => {

    const uid = req.uid;
    const alquiler = new Alquiler({ 
        usuario: uid,
        ...req.body 
    });

    try {
    //creamos un objeto de la clase model Usuario
    const alquiler = new Alquiler(req.body);

    //indicamos a mongoose que registre al usuario en la bd
    await alquiler.save();

    
    res.json({
        ok:true,
        autor
    });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar alquiler, consulte con el administrador'
        })
    }
}
const actualizarAlquiler = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const alquiler = await Alquiler.findById(id);

        if (!alquiler) {
            return res.status(404).json({
                ok: true,
                msg: 'Alquiler no encontrado por id',
            });
        }

        const cambiosAlquiler = {
            ...req.body,
            alquiler: uid
        }

        const alquilerActualizado = await Alquiler.findByIdAndUpdate(id, cambiosAlquiler, { new: true });


        res.json({
            ok: true,
            autor: alquilerActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el alquiler, consulte con el administrador'
        })
    }

}

const eliminarAlquiler = async(req, res = response) => {

    const id = req.params.id;

    try {

        const alquiler = await Alquiler.findById(id);

        if (!alquiler) {
            return res.status(404).json({
                ok: true,
                msg: 'Alquiler no encontrado por id',
            });
        }

        await Alquiler.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Alquiler borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Alquiler no puede eliminarse, consulte con el administrador'
        })
    }
}

module.exports = {
    getAlquiler,
    crearAlquiler,
    eliminarAlquiler,
    actualizarAlquiler,
}