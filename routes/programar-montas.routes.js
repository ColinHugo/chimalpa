const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { validarCampos, validarJWT } = require( '../middlewares' );

const { existeCaballo, existeHistorialReproductivoCaballo,
        existeMonta } = require( '../helpers/db-validators' );

const { obtenerMontaCaballoById, registrarMontaCaballo,
        eliminarMontaCaballo } = require( '../controllers/programar-montas-caballos.controller' );

router.get( '/caballos/:idCaballo/:idHistorialReproductivo', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoCaballo ),
    validarCampos
], obtenerMontaCaballoById );

router.post( '/caballos/:idCaballo/:idHistorialReproductivo', [
    validarJWT,
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoCaballo ),
    validarCampos
], registrarMontaCaballo );

router.delete( '/caballos/:idMonta', [
    validarJWT,
    check( 'idMonta', 'No es un id válido' ).isMongoId(),
    check( 'idMonta' ).custom( existeMonta ),
    validarCampos
], eliminarMontaCaballo );

module.exports = router;