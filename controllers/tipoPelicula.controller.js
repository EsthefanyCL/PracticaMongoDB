const { response } = require('express');
const TPelicula = require('../models/tipoPelicula.model');

const getTipoPelis = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;
    
    const [tipoPeliculas, total] = await Promise.all([
        TPelicula
        .find({}, 'titulo categoria')
        .skip(desde) //variable de paginacion
        .limit(limite), // cuantos valores traer
        TPelicula.countDocuments()
    ]);
    res.json({
        ok: true,
        tipoPeliculas
    });
}

const crearTipoPelis = async (req, res = response) => {
    
    const {titulo,categorias} = req.body;
    try {
        const existeTitulo = await TPelicula.findOne({titulo});
    if(existeTitulo){
        return res.status(400).json({
            ok:false,
            msg: 'El titulo ya ha sido registrado'
        });
    }
    //creamos un objeto de la clase model  tipoPelicula
    const  tipoPelicula= new TPelicula(req.body);

    //indicamos a mongoose que registre al  tipoPelicula en la bd
    await  tipoPelicula.save();
    
    res.json({
        ok:true,
        tipoPelicula
    });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar Tipo de Pelicula, consulte con el administrador'
        })
    }      
}

module.exports = {
    getTipoPelis,
    crearTipoPelis,
}
