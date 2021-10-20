/*
Ruta:/api/autor
*/

const {Router} = require('express');
//Check: para validar datos, ej nombre no este vacio o el password
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {crearAutor, getAutores } = require('../controllers/autor.controller');

const router = Router();

router.get('/', getAutores);
router.post('/',
    [
        check('nombre', 'El nombre del autor es obligatorio').not().isEmpty(),
        check('fecha_nacimiento', 'La fecha de nacimiento es obligatorio').not().isEmpty(),
        
        validarCampos,
    ] ,
    crearAutor);

module.exports = router;