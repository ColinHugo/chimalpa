const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeBorrego } = require( '../helpers' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const {
    obtenerBorregos,
    obtenerBorregoById,
    registrarBorrego,
    actualizarBorrego,
    eliminarBorrego
} = require( '../controllers/borregos.controller' );

router.get( '/', obtenerBorregos );

router.get( '/:idBorrego', [
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    validarCampos
], obtenerBorregoById );

router.post( '/', [
    validarJWT,
    check( 'numeroBorrego', 'El numero de borrego es obligatorio.' ).escape().trim().notEmpty(),
    check( 'sexo', 'El sexo del borrego es obligatorio.' ).escape().trim().notEmpty(),
    check( 'peso', 'Ingrese un peso de borrego válido.' ).escape().trim().notEmpty().isNumeric(),
    check( 'kilo', 'Ingrese una cantidad en kilos válida.' ).escape().trim().notEmpty().isNumeric(),
    check( 'rebano', 'El rebaño del borrego es obligatorio.' ).escape().trim().notEmpty(),
    check( 'fechaNacimiento', 'Ingrese una fecha de nacimiento válida.' ).escape().trim().isDate(),
    validarCampos
], registrarBorrego );

router.put( '/:idBorrego', [
    validarJWT,
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    check( 'numeroBorrego', 'El numero de borrego es obligatorio.' ).escape().trim().notEmpty(),
    check( 'sexo', 'El sexo del borrego es obligatorio.' ).escape().trim().notEmpty(),
    check( 'peso', 'Ingrese un peso de borrego válido.' ).escape().trim().notEmpty().isNumeric(),
    check( 'kilo', 'Ingrese una cantidad en kilos válida.' ).escape().trim().notEmpty().isNumeric(),
    check( 'rebano', 'El rebaño del borrego es obligatorio.' ).escape().trim().notEmpty(),
    check( 'fechaNacimiento', 'Ingrese una fecha de nacimiento válida.' ).escape().trim().isDate(),
    validarCampos
], actualizarBorrego );

router.delete( '/:idBorrego', [
    validarJWT,
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    validarCampos
], eliminarBorrego );

module.exports = router;