const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeCaballo, existeHistorialReproductivoCaballo,
        existeBorrego, existeHistorialReproductivoBorrego } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerHistorialReproductivoBorregos, obtenerHistorialReproductivoBorregoById, 
        registrarHistorialReproductivoBorrego, actualizarHistorialReproductivoBorrego } = require( '../controllers/historial-reproductivo-borrego.controller' );

const { obtenerHistorialReproductivoCaballos, obtenerHistorialReproductivoCaballoById,
        registrarHistorialReproductivoCaballo, actualizarHistorialReproductivoCaballo } = require( '../controllers/historial-reproductivo.controller' );

// *************************************************************
// - End points para historiales reproductivos de los borregos -
// *************************************************************
// * * * * * * * * * B O R R E G O S * * * * * * * * * *

router.get( '/borregos', obtenerHistorialReproductivoBorregos );

router.get( '/borregos/:idBorrego', [
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    validarCampos
], obtenerHistorialReproductivoBorregoById );

router.post( '/borregos/:idBorrego', [
    validarJWT,
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    check( 'inicioCelo', 'El inicio de celo es obligatorio' ).escape().trim().notEmpty(),
    check( 'semental', 'El semental es obligatorio' ).escape().trim().notEmpty(),
    check( 'tipoMonta', 'El tipo de monta es obligatorio' ).escape().trim().notEmpty(),
    validarCampos
], registrarHistorialReproductivoBorrego );

router.put( '/borregos/:idHistorialReproductivo', [
    validarJWT,
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoBorrego ),
    validarCampos
], actualizarHistorialReproductivoBorrego );

// *************************************************************
// - End points para historiales reproductivos de los caballos -
// *************************************************************
// * * * * * * * * * * C A B A L L O S * * * * * * * * * *

router.get( '/caballos', obtenerHistorialReproductivoCaballos );

router.get( '/caballos/:idCaballo', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], obtenerHistorialReproductivoCaballoById );

router.post( '/caballos/:idCaballo', [
    validarJWT,
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    check( 'inicioCelo', 'El inicio de celo es obligatorio' ).escape().trim().notEmpty(),
    check( 'semental', 'El semental es obligatorio' ).escape().trim().notEmpty(),
    check( 'tipoMonta', 'El tipo de monta es obligatorio' ).escape().trim().notEmpty(),
    validarCampos
], registrarHistorialReproductivoCaballo );

router.put( '/caballos/:idHistorialReproductivo', [
    validarJWT,
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoCaballo ),
    validarCampos
], actualizarHistorialReproductivoCaballo );

module.exports = router;