
const { Router } = require('express');
const { check } =  require('express-validator');
const { getAlquiler, crearAlquiler, actualizarAlquiler, eliminarAlquiler } = require('../controllers/alquiler.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require ('../middlewares/validar-jwt');

//const { getAlquiler, crearAlquiler } = require ('../controllers/p.controller')
const router = Router();

router.get('/', getAlquiler);
router.post('/',
    [
        validarJWT,
        check('fecha_alquiler','La fecha de alquiler es obligatorio').not().isEmpty(),
        check('valor','el valor de alquiler es obligatorio').not().isEmpty(),
        check('cantidad','La cantidad de alquiler es obligatorio').not().isEmpty(),
        validarCampos,
    ] ,
    crearAlquiler);
router.put('/:id',
    [
        validarJWT,
        check('fecha_alquiler', 'La fecha de alquiler es obligatorio').not().isEmpty(),
        validarCampos,   
    ] ,
    actualizarAlquiler);

router.delete('/:id',validarJWT, eliminarAlquiler);

module.exports = router;