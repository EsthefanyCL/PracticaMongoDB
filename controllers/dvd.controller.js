const { response } = require('express');
const Dvd = require('../models/Dvd.model');


const getDvd = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;
    
    const [dvd, total] = await Promise.all([
        Dvd
        .find({}, 'numCopias formato pelicula')
        .skip(desde) //variable de paginacion
        .limit(limite), // cuantos valores traer
        Dvd.countDocuments()
    ]);
    res.json({
        ok: true,
        dvd
    });
}

const crearDvd = async(req, res = response) => {

    const uid = req.uid;
    const dvd = new Dvd({ 
        pelicula: uid,
        ...req.body 
    });

    try {
        const dvdDB = await dvd.save();
        
        res.json({
            ok: true,
            dvds: dvdDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar dvd, consulte con el administrador'
        })
    }
}

module.exports = {
    getDvd,
    crearDvd,
}