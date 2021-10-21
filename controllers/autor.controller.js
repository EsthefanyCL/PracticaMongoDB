const {response} = require('express');

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
    const uid = req.params.id;
        
    try {
        const autorDB = await Autor.findById(uid);

        if (!autorDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un autor con ese id'
            });
        }

        //Codigo previo a la actualizacion 
        const {nombre, fecha_nacimiento} = req.body;
        if(autorDB.nombre !== nombre){
            const existeNombre = await Autor.findOne({nombre});
            if (existeNombre){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un autor con este email'
                });
            }
        }
        campos.nombre = nombre;
               
        //actualizacion de datos
        const autorActualizado = await Autor.findByIdAndUpdate(uid, campos, {new:true});

        res.json({
            ok:true,
            autor: autorActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar autor'
        });
    }
}

const eliminarAutor = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const autorDB = await Autor.findById(uid);
        if(!autorDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un autor con ese id'
            });
        }

        await Autor.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Autor eliminado de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar autor'
        });
    }
}

module.exports = {
    getAutores,
    crearAutor,
    actualizarAutor,
    eliminarAutor,
}
