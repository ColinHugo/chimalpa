const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeCaballo, existeRondinCaballo } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerRondinById, obtenerRondinByIdDate,
         registrarRondin, actualizarRondinCaballo, eliminarRondinCaballo } = require( '../controllers/rondin-caballo.controller' );

router.get( '/:idCaballo', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], obtenerRondinById );

router.get( '/:idCaballo/:desde', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], obtenerRondinByIdDate );

router.post( '/:idCaballo', [
    validarJWT,
    check( 'agua', 'El agua del caballo es obligatorio' ).escape().trim().notEmpty(),
    check( 'descripcionAgua', 'La descripción del agua del caballo es obligatoria' ).escape().trim().notEmpty(),
    check( 'comida', 'La comida del caballo es obligatoria' ).escape().trim().notEmpty(),
    check( 'descripcionComida', 'La descripción de la comida del caballo es obligatoria' ).escape().trim().notEmpty(),
    check( 'hece', 'La hece del caballo es obligatoria' ).escape().trim().notEmpty(),
    check( 'descripcionHece', 'La descripción de la hece del caballo es obligatoria' ).escape().trim().notEmpty(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], registrarRondin );

router.put( '/:idRondin', [
    validarJWT,
    check( 'idRondin', 'No es un id válido' ).isMongoId(),
    check( 'idRondin' ).custom( existeRondinCaballo ),
    validarCampos
], actualizarRondinCaballo );

router.delete( '/:idRondin', [
    validarJWT,
    check( 'idRondin', 'No es un id válido' ).isMongoId(),
    check( 'idRondin' ).custom( existeRondinCaballo ),
    validarCampos
], eliminarRondinCaballo );

module.exports = router;