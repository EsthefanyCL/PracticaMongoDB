/**
* Path:/api/usuarios
* / */
const {Router} = require('express');
//Check: para validar datos, ej nombre no este vacio o el password
const {check} = require('express-validator');
const { getTipoPelis, crearTipoPelis } = require('../controllers/tipoPelicula.controller');
const {validarCampos} = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT, getTipoPelis);
router.post('/',
    [
        check('titulo', 'El titulo es obligatorio').not().isEmpty(),
        check('categoria','La categoria es obligatorio').not().isEmpty(),
        validarCampos,
    ] ,
    crearTipoPelis);    
module.exports = router;

