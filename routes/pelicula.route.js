const {Router} = require('express');
//Check: para validar datos, ej nombre no este vacio o el password
const {check} = require('express-validator');
const { getPeli, crearPeli } = require('../controllers/pelicula.controller');
const {validarCampos} = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getPeli);
router.post('/',
    [
        check('autor', 'El autor es obligatorio').not().isEmpty(),
        check('tipoPeli', 'El tipo de Peli es obligatorio').not().isEmpty(),
        
        validarCampos,
    ] ,
    crearPeli);

module.exports = router;