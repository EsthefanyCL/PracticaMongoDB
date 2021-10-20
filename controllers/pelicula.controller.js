const { response } = require('express');
const Pelicula = require('../models/pelicula.model');

const getPeli = async(req, res = response) => {

    const peliculas = await Pelicula.find()
                                    .populate('autor', 'tipoPeli');

    res.json({
        ok: true,
        peliculas
    })
}

const crearPeli = async(req, res = response) => {

    const uid = req.uid;
    const pelicula = new Pelicula({ 
        autor: uid,
        ...req.body 
    });

    try {
        const peliculaDB = await pelicula.save();
        
        res.json({
            ok: true,
            peliculas: peliculaDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar pelicula, consulte con el administrador'
        })
    }
}

module.exports = {
    getPeli,
    crearPeli,
}