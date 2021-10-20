const {response} = require('express');
const bcrypt = require('bcryptjs');
const Autor = require('../models/autor.model');

const getAutores = async(req, res) => {
    //const ponente = await Ponente.find();
    //para la paginacion: ponentes/?desde=5 se utiliza & para concatenar parametros
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;
    
    const [autores, total] = await Promise.all([
        Autor
        .find({}, 'nombre fecha_nacimiento')
        .skip(desde) //variable de paginacion
        .limit(limite), // cuantos valores traer
        Autor.countDocuments()
    ]);
    res.json({
        ok: true,
        autores
    });
}

const crearAutor = async(req, res = response) => {

    const {nombre,fecha_nacimiento} = req.body;
        try {
            const existeNombre = await Autor.findOne({nombre});
        if(existeNombre){
            return res.status(400).json({
                ok:false,
                msg: 'El nombre ya ha sido registrado'
            });
        }

        //creamos un objeto de la clase model Usuario
        const autor = new Autor(req.body);

        //indicamos a mongoose que registre al usuario en la bd
        await autor.save();

        
        res.json({
            ok:true,
            autor
        });
    
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Error al grabar Autor, consulte con el administrador'
            })
        }        
}

const actualizarAutor = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const local = await Autor.findById(id);

        if (!local) {
            return res.status(404).json({
                ok: true,
                msg: 'Autor no encontrado por id',
            });
        }

        const cambiosAutor = {
            ...req.body,
            autor: uid
        }

        const autorActualizado = await Autor.findByIdAndUpdate(id, cambiosAutor, { new: true });


        res.json({
            ok: true,
            autor: autorActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el autor, consulte con el administrador'
        })
    }

}

const eliminarAutor = async(req, res = response) => {

    const id = req.params.id;

    try {

        const autor = await Autor.findById(id);

        if (!autor) {
            return res.status(404).json({
                ok: true,
                msg: 'El autor no encontrado por id',
            });
        }

        await Autor.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Autor borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Autor no puede eliminarse, consulte con el administrador'
        })
    }

}

module.exports = {
    getAutores,
    crearAutor,
    actualizarAutor,
    eliminarAutor,
}
