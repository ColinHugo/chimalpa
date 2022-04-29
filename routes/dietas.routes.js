const router = require( 'express' ).Router();

const { check } = require( 'express-validator' );

const {
    existeAve,
    existeDietaAve,
    existeBorrego,
    existeDietaBorrego,
    existeCaballo,
    existeDietaCaballo,
    existeDietaYegua, 
    existeConejo,
    existeDietaConejo,
    existeMascota,
    existeDietaMascota
} = require( '../helpers' );

const {
    obtenerDietaAves,
    obtenerDietaAveById,
    registrarDietaAve,
    actualizarDietaAve,
    eliminarDietaAve
} = require( '../controllers/dieta-aves.controller' );

const {
    obtenerDietaBorregos,
    obtenerDietaBorregoById,
    registrarDietaBorrego,
    actualizarDietaBorrego,
    eliminarDietaBorrego
} = require( '../controllers/dieta-borregos.controller' );

const {
    obtenerDietaCaballos,
    obtenerDietaCaballoById, 
    registrarDietaCaballo,
    actualizarDietaCaballo
} = require( '../controllers/dieta-caballos.controller' );

const {
    obtenerDietaConejos,
    obtenerDietaConejoById,
    registrarDietaConejo,
    actualizarDietaConejo
} = require('../controllers/dieta-conejos.controller');

const {
    obtenerDietaMascotas,
    obtenerDietaMascotaById,
    registrarDietaMascota,
    actualizarDietaMascota
} = require( '../controllers/dieta-mascotas.controller' );

const {
    obtenerDietaYeguas,
    obtenerDietaYeguaById,
    registrarDietaYegua,
    actualizarDietaYegua
} = require( '../controllers/dieta-yeguas.controller' );

const { validarCampos, validarJWT } = require( '../middlewares' );

// ****************************************************
// -    End points para las dietas de las aves    -
// ****************************************************
// * * * * * * * * * * A V E S * * * * * * * * * *

router.get( '/aves', obtenerDietaAves );

router.get( '/aves/:idAve', [
    check( 'idAve', 'No es un id válido' ).isMongoId(),
    check( 'idAve' ).custom( existeAve ),
    validarCampos
], obtenerDietaAveById );

router.post( '/aves/:idAve', [
    validarJWT,
    check( 'idAve', 'No es un id válido' ).isMongoId(),
    check( 'idAve' ).custom( existeAve ),
    check( 'avena_cantidad_manana', 'La cantidad de la avena por la mañana es obligatoria.' ).escape().trim().notEmpty(),
    check( 'avena_cantidad_tarde', 'La cantidad de la avena por la tarde es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_manana', 'La cantidad de la alfalfa por la mañana es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_tarde', 'La cantidad de la alfalfa por la tarde es obligatoria.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_manana', 'La cantidad del grano por la mañana es obligatorio.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_tarde', 'La cantidad del grano por la tarde es obligatorio.' ).escape().trim().notEmpty(),
    validarCampos
], registrarDietaAve );

router.put( '/aves/:idDietaAve', [
    validarJWT,
    check( 'idDietaAve', 'No es un id válido' ).isMongoId(),
    check( 'idDietaAve' ).custom( existeDietaAve ),
    check( 'avena_cantidad_manana', 'La cantidad de la avena por la mañana es obligatoria.' ).escape().trim().notEmpty(),
    check( 'avena_cantidad_tarde', 'La cantidad de la avena por la tarde es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_manana', 'La cantidad de la alfalfa por la mañana es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_tarde', 'La cantidad de la alfalfa por la tarde es obligatoria.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_manana', 'La cantidad del grano por la mañana es obligatorio.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_tarde', 'La cantidad del grano por la tarde es obligatorio.' ).escape().trim().notEmpty(),
    validarCampos
], actualizarDietaAve );

router.delete( '/aves/:idDietaAve', [
    validarJWT,
    check( 'idDietaAve', 'No es un id válido' ).isMongoId(),
    check( 'idDietaAve' ).custom( existeDietaAve ),
    validarCampos
], eliminarDietaAve );

// ****************************************************
// -    End points para las dietas de los borregos    -
// ****************************************************
// * * * * * * * * * * B O R R E G O S * * * * * * * * * *

router.get( '/borregos', obtenerDietaBorregos );

router.get( '/borregos/:idBorrego', [
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    validarCampos
], obtenerDietaBorregoById );

router.post( '/borregos/:idBorrego', [
    validarJWT,
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    check( 'avena_cantidad_manana', 'La cantidad de la avena por la mañana es obligatoria.' ).escape().trim().notEmpty(),
    check( 'avena_cantidad_tarde', 'La cantidad de la avena por la tarde es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_manana', 'La cantidad de la alfalfa por la mañana es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_tarde', 'La cantidad de la alfalfa por la tarde es obligatoria.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_manana', 'La cantidad del grano por la mañana es obligatorio.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_tarde', 'La cantidad del grano por la tarde es obligatorio.' ).escape().trim().notEmpty(),
    validarCampos
], registrarDietaBorrego );

router.put( '/borregos/:idDietaBorrego', [
    validarJWT,
    check( 'idDietaBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idDietaBorrego' ).custom( existeDietaBorrego ),
    validarCampos
], actualizarDietaBorrego );

router.delete( '/borregos/:idDietaBorrego', [
    validarJWT,
    check( 'idDietaBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idDietaBorrego' ).custom( existeDietaBorrego ),
    validarCampos
], eliminarDietaBorrego );

// ****************************************************
// -    End points para las dietas de los caballos    -
// ****************************************************
// * * * * * * * * * * C A B A L L O S * * * * * * * * * *

router.get( '/caballos', obtenerDietaCaballos );

router.get( '/caballos/:idCaballo', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], obtenerDietaCaballoById );

router.post( '/caballos/:idCaballo', [
    validarJWT,
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    check( 'avena_cantidad_manana', 'La cantidad de la avena por la mañana es obligatoria.' ).escape().trim().notEmpty(),
    check( 'avena_cantidad_tarde', 'La cantidad de la avena por la tarde es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_manana', 'La cantidad de la alfalfa por la mañana es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_tarde', 'La cantidad de la alfalfa por la tarde es obligatoria.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_manana', 'La cantidad del grano por la mañana es obligatorio.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_tarde', 'La cantidad del grano por la tarde es obligatorio.' ).escape().trim().notEmpty(),
    validarCampos
], registrarDietaCaballo );

router.put( '/caballos/:idDietaCaballo', [
    validarJWT,
    check( 'idDietaCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idDietaCaballo' ).custom( existeDietaCaballo ),
    validarCampos
], actualizarDietaCaballo );

// ****************************************************
// -     End points para las dietas de las yeguas     -
// ****************************************************
// * * * * * * * * * * Y E G U A S * * * * * * * * * *

router.get( '/yeguas', obtenerDietaYeguas );

router.get( '/yeguas/:idCaballo', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], obtenerDietaYeguaById );

router.post( '/yeguas/:idCaballo', [
    validarJWT,
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    check( 'avena_cantidad_manana_vacia', 'La cantidad de la avena por la mañana cuando está vacia es obligatoria.' ).escape().trim().notEmpty(),
    check( 'avena_cantidad_manana_gestante', 'La cantidad de la avena por la mañana cuando está gestante es obligatoria.' ).escape().trim().notEmpty(),
    check( 'avena_cantidad_manana_cria', 'La cantidad de la avena por la mañana cuando tiene cría es obligatoria.' ).escape().trim().notEmpty(),
    check( 'avena_cantidad_tarde_vacia', 'La cantidad de la avena por la tarde cuando está vacia es obligatoria.' ).escape().trim().notEmpty(),
    check( 'avena_cantidad_tarde_gestante', 'La cantidad de la avena por la tarde cuando está gestante es obligatoria.' ).escape().trim().notEmpty(),
    check( 'avena_cantidad_tarde_cria', 'La cantidad de la avena por la tarde cuando tiene cría es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_manana_vacia', 'La cantidad de la alfalfa por la mañana cuando está vacia es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_manana_gestante', 'La cantidad de la alfalfa por la mañana cuando está gestante es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_manana_cria', 'La cantidad de la alfalfa por la mañana cuando tiene cría es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_tarde_vacia', 'La cantidad de la alfalfa por la tarde cuando está vacia es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_tarde_gestante', 'La cantidad de la alfalfa por la tarde cuando está gestante es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_tarde_cria', 'La cantidad de la alfalfa por la tarde cuando tiene cría es obligatoria.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_manana_vacia', 'La cantidad de grano por la mañana cuando está vacia es obligatoria.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_manana_gestante', 'La cantidad de grano por la mañana cuando está gestante es obligatoria.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_manana_cria', 'La cantidad de grano por la mañana cuando tiene cría es obligatoria.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_tarde_vacia', 'La cantidad de grano por la tarde cuando está vacia es obligatoria.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_tarde_gestante', 'La cantidad de grano por la tarde cuando está gestante es obligatoria.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_tarde_cria', 'La cantidad de grano por la tarde cuando tiene cría es obligatoria.' ).escape().trim().notEmpty(),
    check( 'aceite_cantidad_manana_vacia', 'La cantidad de aceite por la mañana cuando está vacia es obligatoria.' ).escape().trim().notEmpty(),
    check( 'aceite_cantidad_manana_gestante', 'La cantidad de aceite por la mañana cuando está gestante es obligatoria.' ).escape().trim().notEmpty(),
    check( 'aceite_cantidad_manana_cria', 'La cantidad de aceite por la mañana cuando tiene cría es obligatoria.' ).escape().trim().notEmpty(),
    check( 'aceite_cantidad_tarde_vacia', 'La cantidad de aceite por la tarde cuando está vacia es obligatoria.' ).escape().trim().notEmpty(),
    check( 'aceite_cantidad_tarde_gestante', 'La cantidad de aceite por la tarde cuando está gestante es obligatoria.' ).escape().trim().notEmpty(),
    check( 'aceite_cantidad_tarde_cria', 'La cantidad de aceite por la tarde cuando tiene cría es obligatoria.' ).escape().trim().notEmpty(),
    validarCampos
], registrarDietaYegua );

router.put( '/yeguas/:idDietaCaballo', [
    validarJWT,
    check( 'idDietaCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idDietaCaballo' ).custom( existeDietaYegua ),
    validarCampos
], actualizarDietaYegua );

// ****************************************************
// -    End points para las dietas de los conejos     -
// ****************************************************
// * * * * * * * * * * C O N E J O S * * * * * * * * * *

router.get( '/conejos', obtenerDietaConejos );

router.get( '/conejos/:idConejo', [
    check( 'idConejo', 'No es un id válido' ).isMongoId(),
    check( 'idConejo' ).custom( existeConejo ),
    validarCampos
], obtenerDietaConejoById );

router.post( '/conejos/:idConejo', [
    validarJWT,
    check( 'idConejo', 'No es un id válido' ).isMongoId(),
    check( 'idConejo' ).custom( existeConejo ),
    check( 'avena_cantidad_manana', 'La cantidad de la avena por la mañana es obligatoria.' ).escape().trim().notEmpty(),
    check( 'avena_cantidad_tarde', 'La cantidad de la avena por la tarde es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_manana', 'La cantidad de la alfalfa por la mañana es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_tarde', 'La cantidad de la alfalfa por la tarde es obligatoria.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_manana', 'La cantidad del grano por la mañana es obligatorio.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_tarde', 'La cantidad del grano por la tarde es obligatorio.' ).escape().trim().notEmpty(),
    validarCampos
], registrarDietaConejo );

router.put( '/conejos/:idDietaConejo', [
    validarJWT,
    check( 'idDietaConejo', 'No es un id válido' ).isMongoId(),
    check( 'idDietaConejo' ).custom( existeDietaConejo ),
    validarCampos
], actualizarDietaConejo );

// ****************************************************
// -    End points para las dietas de las mascotas     -
// ****************************************************
// * * * * * * * * * * M A S C O T A S * * * * * * * * * *

router.get( '/mascotas', obtenerDietaMascotas );

router.get( '/mascotas/:idMascota', [
    check( 'idMascota', 'No es un id válido' ).isMongoId(),
    check( 'idMascota' ).custom( existeMascota ),
    validarCampos
], obtenerDietaMascotaById );

router.post( '/mascotas/:idMascota', [
    validarJWT,
    check( 'idMascota', 'No es un id válido' ).isMongoId(),
    check( 'idMascota' ).custom( existeMascota ),
    check( 'avena_cantidad_manana', 'La cantidad de la avena por la mañana es obligatoria.' ).escape().trim().notEmpty(),
    check( 'avena_cantidad_tarde', 'La cantidad de la avena por la tarde es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_manana', 'La cantidad de la alfalfa por la mañana es obligatoria.' ).escape().trim().notEmpty(),
    check( 'alfalfa_cantidad_tarde', 'La cantidad de la alfalfa por la tarde es obligatoria.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_manana', 'La cantidad del grano por la mañana es obligatorio.' ).escape().trim().notEmpty(),
    check( 'grano_cantidad_tarde', 'La cantidad del grano por la tarde es obligatorio.' ).escape().trim().notEmpty(),
    validarCampos
], registrarDietaMascota );

router.put( '/mascotas/:idDietaMascota', [
    validarJWT,
    check( 'idDietaMascota', 'No es un id válido' ).isMongoId(),
    check( 'idDietaMascota' ).custom( existeDietaMascota ),
    validarCampos
], actualizarDietaMascota );

module.exports = router;