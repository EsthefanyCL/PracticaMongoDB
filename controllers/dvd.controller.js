const { response } = require('express');
const Dvd = require('../models/Dvd.model');


const getDvd = async(req, res = response) => {

    const dvds= await Dvd.find({},'numCopias formato')
                     .populate('pelicula','autor tipoPeli');
    
    res.json({
        ok:true,
        dvds
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