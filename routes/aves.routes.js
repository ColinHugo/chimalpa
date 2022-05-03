const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeAve } = require( '../helpers' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const {
    obtenerAves,
    obtenerAveById,
    registrarAve,
    actualizarAve,
    eliminarAve
} = require( '../controllers/aves.controller' );

router.get( '/', obtenerAves );

router.get( '/:idAve', [
    check( 'idAve', 'No es un id válido' ).isMongoId(),
    check( 'idAve' ).custom( existeAve ),
    validarCampos
], obtenerAveById );

router.post( '/', [
    validarJWT,
    check( 'numeroAve', 'El número de ave es obligatorio' ).escape().trim().notEmpty(),
    check( 'tipo', 'El tipo de ave es obligatorio' ).escape().trim().notEmpty(),
    check( 'precio', 'El precio del ave es obligatorio' ).escape().trim().isNumeric(),
    check( 'sexo', 'El sexo del ave es obligatorio' ).escape().trim().notEmpty(),
    check( 'fechaNacimiento', 'Ingrese una fecha de nacimiento válida' ).escape().trim().isDate(),
    validarCampos
], registrarAve );

router.put( '/:idAve', [
    validarJWT,
    check( 'idAve', 'No es un id válido' ).isMongoId(),
    check( 'idAve' ).custom( existeAve ),
    validarCampos
], actualizarAve );

router.delete( '/:idAve', [
    validarJWT,
    check( 'idAve', 'No es un id válido' ).isMongoId(),
    check( 'idAve' ).custom( existeAve ),
    validarCampos
], eliminarAve );

module.exports = router;