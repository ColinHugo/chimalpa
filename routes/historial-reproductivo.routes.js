const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const {
    existeAve,
    existeHistorialReproductivoAve,
    existeBorrego,
    existeHistorialReproductivoBorrego,
    existeCaballo,
    existeHistorialReproductivoCaballo,
    existeConejo,
    existeHistorialReproductivoConejo,
    existeMascota,
    existeHistorialReproductivoMascota
} = require( '../helpers' );

const { validarCampos, validarJWT } = require( '../middlewares' );

const {
    obtenerHistorialReproductivoAves,
    obtenerHistorialReproductivoAveById,
    registrarHistorialReproductivoAve,
    actualizarHistorialReproductivoAve,
    eliminarHistorialReproductivoAve
} = require( '../controllers/historial-reproductivo-ave.controller' );

const {
    obtenerHistorialReproductivoBorregos,
    obtenerHistorialReproductivoBorregoById,
    registrarHistorialReproductivoBorrego,
    actualizarHistorialReproductivoBorrego
} = require( '../controllers/historial-reproductivo-borrego.controller' );

const {
    obtenerHistorialReproductivoCaballos,
    obtenerHistorialReproductivoCaballoById,
    registrarHistorialReproductivoCaballo,
    actualizarHistorialReproductivoCaballo,
    eliminarHistorialReproductivoCaballo
} = require( '../controllers/historial-reproductivo.controller' );

const {
    obtenerHistorialReproductivoConejos,
    obtenerHistorialReproductivoConejoById,
    registrarHistorialReproductivoConejo,
    actualizarHistorialReproductivoConejo,
    eliminarHistorialReproductivoConejo
} = require( '../controllers/historial-reproductivo-conejo.controller' );

const {
    obtenerHistorialReproductivoMascotas,
    obtenerHistorialReproductivoMascotaById,
    registrarHistorialReproductivoMascota,
    actualizarHistorialReproductivoMascota,
    eliminarHistorialReproductivoMascota
} = require( '../controllers/historial-reproductivo-mascota.controller' );

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

router.post( '/aves/:idAveHembra/:idAveMacho', [
    validarJWT,
    check( 'idAveHembra', 'No es un id válido' ).isMongoId(),
    check( 'idAveHembra' ).custom( existeAve ),
    check( 'idAveMacho', 'No es un id válido' ).isMongoId(),
    check( 'idAveMacho' ).custom( existeAve ),
    check( 'fechaInicio', 'El inicio de celo es obligatorio.' ).trim().escape().isDate(),
    check( 'fechaTermino', 'El inicio de celo es obligatorio.' ).trim().escape().isDate(),
    check( 'instrucciones', 'El semental es obligatorio.' ).trim().notEmpty(),
    validarCampos
], registrarHistorialReproductivoAve );

router.put( '/aves/:idHistorialReproductivo', [
    validarJWT,
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoAve ),
    check( 'fechaInicio', 'El inicio de celo es obligatorio.' ).trim().escape().isDate(),
    check( 'fechaTermino', 'El inicio de celo es obligatorio.' ).trim().escape().isDate(),
    validarCampos
], actualizarHistorialReproductivoAve );

router.delete( '/aves/:idHistorialReproductivo', [
    validarJWT,
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoAve ),
    validarCampos
], eliminarHistorialReproductivoAve );

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
    check( 'inicioCelo', 'El inicio de celo es obligatorio' ).trim().notEmpty().isDate(),
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

router.get( '/conejos/:idConeja', [
    check( 'idConeja', 'No es un id válido' ).isMongoId(),
    check( 'idConeja' ).custom( existeConejo ),
    validarCampos
], obtenerHistorialReproductivoConejoById );

router.post( '/conejos/:idConeja/:idConejo', [
    validarJWT,
    check( 'idConeja', 'No es un id válido' ).isMongoId(),
    check( 'idConejo', 'No es un id válido' ).isMongoId(),
    check( 'idConeja' ).custom( existeConejo ),
    check( 'idConejo' ).custom( existeConejo ),
    check( 'fechaMonta1', 'Ingrese una fecha válida de la primera monta.' ).trim().escape().isDate(), 
    check( 'fechaMonta2', 'Ingrese una fecha válida de la segunda monta.' ).trim().escape().isDate(), 
    check( 'observacionesConejo', 'Las observaciones del conejo son obligatorias.' ).trim().escape().notEmpty(),
    check( 'observacionesMonta', 'Las observaciones de la monta son obligatorias.' ).trim().escape().notEmpty(),
    check( 'nido', 'El nido del conejo es obligatorio.' ).trim().escape().notEmpty(),
    check( 'fechaDestete', 'Ingresa una fecha de destete válida.' ).trim().escape().isDate(), 
    check( 'gazaposVivos', 'Los gazapos vivos son obligatorios.' ).trim().isNumeric().toInt(),
    check( 'gazaposMuertos', 'Los gazapos muertos son obligatorios.' ).trim().isNumeric().toInt(),
    check( 'causaMuerte', 'La causa de muerte de los gazapos vivos son obligatorios.' ).trim().escape().notEmpty(),
    validarCampos
], registrarHistorialReproductivoConejo );

router.put( '/conejos/:idHistorialReproductivo', [
    validarJWT,
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoConejo ),
    check( 'fechaMonta1', 'Ingrese una fecha válida de la primera monta.' ).trim().escape().isDate(), 
    check( 'fechaMonta2', 'Ingrese una fecha válida de la segunda monta.' ).trim().escape().isDate(), 
    check( 'observacionesConejo', 'Las observaciones del conejo son obligatorias.' ).trim().escape().notEmpty(),
    check( 'observacionesMonta', 'Las observaciones de la monta son obligatorias.' ).trim().escape().notEmpty(),
    check( 'nido', 'El nido del conejo es obligatorio.' ).trim().escape().notEmpty(),
    check( 'fechaDestete', 'Ingresa una fecha de destete válida.' ).trim().escape().isDate(), 
    check( 'gazaposVivos', 'Los gazapos vivos son obligatorios.' ).trim().isNumeric().toInt(),
    check( 'gazaposMuertos', 'Los gazapos muertos son obligatorios.' ).trim().isNumeric().toInt(),
    check( 'causaMuerte', 'La causa de muerte de los gazapos vivos son obligatorios.' ).trim().escape().notEmpty(),
    validarCampos
], actualizarHistorialReproductivoConejo );

router.delete( '/conejos/:idHistorialReproductivo', [
    validarJWT,
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoConejo ),
    validarCampos
], eliminarHistorialReproductivoConejo );

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
    check( 'fechaCreacion', 'La fecha de creación es obligatoria' ).escape().trim().isDate(),
    check( 'inicioCelo', 'El inicio de celo es obligatorio' ).trim().notEmpty(),
    check( 'tipo', 'El tipo de reproducción es obligatorio' ).trim().notEmpty(),    
    validarCampos
], registrarHistorialReproductivoMascota );

router.put( '/mascotas/:idHistorialReproductivo', [
    validarJWT,
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoMascota ),
    check( 'numeroExpediente', 'El número de expediente es obligatorio' ).trim().notEmpty(), 
    check( 'fechaCreacion', 'La fecha de creación es obligatoria' ).escape().trim().isDate(),
    check( 'inicioCelo', 'El inicio de celo es obligatorio' ).trim().notEmpty(),
    check( 'tipo', 'El tipo de reproducción es obligatorio' ).trim().notEmpty(), 
    validarCampos
], actualizarHistorialReproductivoMascota );

router.delete( '/mascotas/:idHistorialReproductivo', [
    validarJWT,
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoMascota ),
    validarCampos
], eliminarHistorialReproductivoMascota );

module.exports = router;