const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeAve, existeHistorialReproductivoAve,
        existeBorrego, existeHistorialReproductivoBorrego, 
        existeCaballo, existeHistorialReproductivoCaballo,
        existeConejo, existeHistorialReproductivoConejo,
        existeMascota, existeHistorialReproductivoMascota
} = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerHistorialReproductivoAves, obtenerHistorialReproductivoAveById,
        registrarHistorialReproductivoAve, actualizarHistorialReproductivoAve } = require( '../controllers/historial-reproductivo-ave.controller' );

const { obtenerHistorialReproductivoBorregos, obtenerHistorialReproductivoBorregoById, 
        registrarHistorialReproductivoBorrego, actualizarHistorialReproductivoBorrego } = require( '../controllers/historial-reproductivo-borrego.controller' );

const { obtenerHistorialReproductivoCaballos, obtenerHistorialReproductivoCaballoById,
        registrarHistorialReproductivoCaballo, actualizarHistorialReproductivoCaballo,
        eliminarHistorialReproductivoCaballo } = require( '../controllers/historial-reproductivo.controller' );

const { obtenerHistorialReproductivoConejos, obtenerHistorialReproductivoConejoById,
        registrarHistorialReproductivoConejo, actualizarHistorialReproductivoConejo } = require( '../controllers/historial-reproductivo-conejo.controller' );

const { obtenerHistorialReproductivoMascotas, obtenerHistorialReproductivoMascotaById,
        registrarHistorialReproductivoMascota, actualizarHistorialReproductivoMascota } = require( '../controllers/historial-reproductivo-mascota.controller' );

// *************************************************************
// -   End points para historiales reproductivos de las aves   -
// *************************************************************
// * * * * * * * * * A V E S * * * * * * * * * *

router.get( '/aves', obtenerHistorialReproductivoAves );

router.get( '/aves/:idAve', [
    check( 'idAve', 'No es un id válido' ).isMongoId(),
    check( 'idAve' ).custom( existeAve ),
    validarCampos
], obtenerHistorialReproductivoAveById );

router.post( '/aves/:idAve', [
    validarJWT,
    check( 'idAve', 'No es un id válido' ).isMongoId(),
    check( 'idAve' ).custom( existeAve ),
    check( 'fechaInicio', 'El inicio de celo es obligatorio.' ).trim().notEmpty(),
    check( 'fechaTermino', 'El inicio de celo es obligatorio.' ).trim().notEmpty(),
    check( 'instrucciones', 'El semental es obligatorio.' ).trim().notEmpty(),
    validarCampos
], registrarHistorialReproductivoAve );

router.put( '/aves/:idHistorialReproductivo', [
    validarJWT,
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoAve ),
    validarCampos
], actualizarHistorialReproductivoAve );

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
    check( 'numeroExpediente', 'El numero de expediente es obligatorio' ).trim().notEmpty(),
    check( 'inicioCelo', 'El inicio de celo es obligatorio' ).trim().notEmpty(),
    check( 'semental', 'El semental es obligatorio' ).trim().notEmpty(),
    check( 'tipoMonta', 'El tipo de monta es obligatorio' ).trim().notEmpty(),
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

router.get( '/caballos/:idYegua', [
    check( 'idYegua', 'No es un id válido' ).isMongoId(),
    check( 'idYegua' ).custom( existeCaballo ),
    validarCampos
], obtenerHistorialReproductivoCaballoById );

router.post( '/caballos/:idYegua/:idSemental', [
    validarJWT,
    check( 'idYegua', 'No es un id válido' ).isMongoId(),
    check( 'idYegua' ).custom( existeCaballo ),
    check( 'idSemental', 'No es un id válido' ).isMongoId(),
    check( 'idSemental' ).custom( existeCaballo ),
    check( 'inicioCelo', 'El inicio de celo es obligatorio' ).trim().notEmpty(),
    check( 'tipoMonta', 'El tipo de monta es obligatorio' ).trim().notEmpty(),
    validarCampos
], registrarHistorialReproductivoCaballo );

router.put( '/caballos/:idHistorialReproductivo', [
    validarJWT,
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoCaballo ),
    validarCampos
], actualizarHistorialReproductivoCaballo );

router.delete( '/caballos/:idHistorialReproductivo', [
    validarJWT,
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoCaballo ),
    validarCampos
], eliminarHistorialReproductivoCaballo );

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
    check( 'montaAnterior', 'La monta anterior es obligatoria' ).trim().notEmpty(), 
    check( 'fechaMonta1', 'La fecha de la primera monta es obligatoria' ).trim().notEmpty(),
    check( 'semental', 'El semental es obligatorio' ).trim().notEmpty(),
    check( 'opcionSemental', 'La opción del semental es obligatoria' ).trim().notEmpty(),
    check( 'observacionesSemental', 'Las observaciones del semental son obligatorias' ).trim().notEmpty(),
    check( 'observacionesMonta', 'Las observaciones de la monta son obligatorias' ).trim().notEmpty(),
    check( 'nido', 'El nido del conejo es obligatorio' ).trim().notEmpty(),
    check( 'monta2', 'La segunda monta es obligatoria' ).trim().notEmpty(),
    check( 'destete', 'El destete es obligatorio' ).trim().notEmpty(),
    check( 'gazaposVivos', 'Los gazapos vivos son obligatorios' ).trim().notEmpty(),
    check( 'gazaposMuertos', 'Los gazapos muertos son obligatorios' ).trim().notEmpty(),
    check( 'causaMuerte', 'La causa de muerte de los gazapos vivos son obligatorios' ).trim().notEmpty(),
    validarCampos
], registrarHistorialReproductivoConejo );

router.put( '/conejos/:idHistorialReproductivo', [
    validarJWT,
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoConejo ),
    validarCampos
], actualizarHistorialReproductivoConejo );

// *************************************************************
// - End points para historiales reproductivos de las mascotas -
// *************************************************************
// * * * * * * * * * M A S C O T A S * * * * * * * * * *

router.get( '/mascotas', obtenerHistorialReproductivoMascotas );

router.get( '/mascotas/:idMascota', [
    check( 'idMascota', 'No es un id válido' ).isMongoId(),
    check( 'idMascota' ).custom( existeMascota ),
    validarCampos
], obtenerHistorialReproductivoMascotaById );

router.post( '/mascotas/:idMascota', [
    validarJWT,
    check( 'idMascota', 'No es un id válido' ).isMongoId(),
    check( 'idMascota' ).custom( existeMascota ),
    check( 'numeroExpediente', 'El número de expediente es obligatorio' ).trim().notEmpty(), 
    check( 'fechaCreacion', 'La fecha de creación es obligatoria' ).trim().notEmpty(),
    check( 'inicioCelo', 'El inicio de celo es obligatorio' ).trim().notEmpty(),
    check( 'tipo', 'El tipo de reproducción es obligatorio' ).trim().notEmpty(),    
    validarCampos
], registrarHistorialReproductivoMascota );

router.put( '/mascotas/:idHistorialReproductivo', [
    validarJWT,
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoMascota ),
    validarCampos
], actualizarHistorialReproductivoMascota );

module.exports = router;