const {Router} = require('express');
//Check: para validar datos, ej nombre no este vacio o el password
const {check} = require('express-validator');
const {getDvd, crearDvd } = require('../controllers/Dvd.controller');
const {validarCampos} = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getDvd);
router.post('/',
    [
        check('numCopias', 'El numero de copias es obligatorio').not().isEmpty(),
        validarCampos,
    ] ,
    crearDvd);

module.exports = router;