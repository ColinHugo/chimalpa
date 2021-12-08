const router = require( 'express' ).Router();

const { check } = require( 'express-validator' );

const { obtenerDietaCaballos, obtenerDietaCaballoById, 
        registrarDietaCaballo, actualizarDietaCaballo } = require( '../controllers/dieta-caballos.controller' );

const { obtenerDietaYeguas, obtenerDietaYeguaById,
        registrarDietaYegua, actualizarDietaYegua } = require( '../controllers/dieta-yeguas.controller' );

const { existeCaballo, existeDietaCaballo, existeDietaYegua } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

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

module.exports = router;