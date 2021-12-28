const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeBorrego, existeHistorialReproductivoBorrego, 
        existeCaballo, existeHistorialReproductivoCaballo,
        existeConejo, existeHistorialReproductivoConejo } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerHistorialReproductivoBorregos, obtenerHistorialReproductivoBorregoById, 
        registrarHistorialReproductivoBorrego, actualizarHistorialReproductivoBorrego } = require( '../controllers/historial-reproductivo-borrego.controller' );

const { obtenerHistorialReproductivoCaballos, obtenerHistorialReproductivoCaballoById,
        registrarHistorialReproductivoCaballo, actualizarHistorialReproductivoCaballo } = require( '../controllers/historial-reproductivo.controller' );

const { obtenerHistorialReproductivoConejos, obtenerHistorialReproductivoConejoById,
        registrarHistorialReproductivoConejo, actualizarHistorialReproductivoConejo } = require( '../controllers/historial-reproductivo-conejo.controller' );
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

// *************************************************************
// - End points para historiales reproductivos de los conejos -
// *************************************************************
// * * * * * * * * * C O N E J O S * * * * * * * * * *

router.get( '/conejos', obtenerHistorialReproductivoConejos );

router.get( '/conejos/:idConejo', [
    check( 'idConejo', 'No es un id válido' ).isMongoId(),
    check( 'idConejo' ).custom( existeConejo ),
    validarCampos
], obtenerHistorialReproductivoConejoById );

router.post( '/conejos/:idConejo', [
    validarJWT,
    check( 'idConejo', 'No es un id válido' ).isMongoId(),
    check( 'idConejo' ).custom( existeConejo ),
    check( 'montaAnterior', 'La monta anterior es obligatoria' ).escape().trim().notEmpty(), 
    check( 'fechaMonta1', 'La fecha de la primera monta es obligatoria' ).escape().trim().notEmpty(),
    check( 'semental', 'El semental es obligatorio' ).escape().trim().notEmpty(),
    check( 'opcionSemental', 'La opción del semental es obligatoria' ).escape().trim().notEmpty(),
    check( 'observacionesSemental', 'Las observaciones del semental son obligatorias' ).escape().trim().notEmpty(),
    check( 'observacionesMonta', 'Las observaciones de la monta son obligatorias' ).escape().trim().notEmpty(),
    check( 'nido', 'El nido del conejo es obligatorio' ).escape().trim().notEmpty(),
    check( 'monta2', 'La segunda monta es obligatoria' ).escape().trim().notEmpty(),
    check( 'destete', 'El destete es obligatorio' ).escape().trim().notEmpty(),
    check( 'gazaposVivos', 'Los gazapos vivos son obligatorios' ).escape().trim().notEmpty(),
    check( 'gazaposMuertos', 'Los gazapos muertos son obligatorios' ).escape().trim().notEmpty(),
    check( 'causaMuerte', 'La causa de muerte de los gazapos vivos son obligatorios' ).escape().trim().notEmpty(),
    validarCampos
], registrarHistorialReproductivoConejo );

router.put( '/conejos/:idHistorialReproductivo', [
    validarJWT,
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoConejo ),
    validarCampos
], actualizarHistorialReproductivoConejo );

module.exports = router;