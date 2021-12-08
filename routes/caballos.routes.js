const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeCaballo } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerCaballos, obtenerCaballoById, registrarCaballo, 
        actualizarCaballo, eliminarCaballo } = require( '../controllers/caballos.controller' );

router.get( '/', obtenerCaballos );

router.get( '/:idCaballo', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], obtenerCaballoById );

router.post( '/', [
    validarJWT,
    check( 'nombre', 'El nombre del caballo es obligatorio' ).escape().trim().notEmpty(),
    check( 'raza', 'La raza del caballo es obligatoria' ).escape().trim().notEmpty(),
    check( 'sexo', 'El sexo del caballo es obligatorio' ).escape().trim().notEmpty(),
    check( 'color', 'El color del caballo es obligatorio' ).escape().trim().notEmpty(),
    validarCampos
], registrarCaballo );

router.put( '/:idCaballo', [
    validarJWT,
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], actualizarCaballo );

router.delete( '/:idCaballo', [
    validarJWT,
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], eliminarCaballo );

module.exports = router;