const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { validarCampos, validarJWT } = require( '../middlewares' );

const { existeBorrego, existeTratamientoBorrego, 
        existeCaballo, existeTratamiento, 
        existeMascota, existeTratamientoMascota } = require( '../helpers/db-validators' );

const { obtenerTratamientosBorregos, obtenerTratamientoBorregoById,
        registrarTratamientoBorrego, actualizarTratamientoBorrego } = require( '../controllers/tratamientos-borregos.controller' );

const { obtenerTratamientosCaballos, obtenerTratamientoCaballoById,
        registrarTratamientoCaballo, actualizarTratamientoCaballo } = require( '../controllers/tratamientos-caballos.controller' );

const { obtenerTratamientosMascotas, obtenerTratamientoMascotaById,
        registrarTratamientoMascota, actualizarTratamientoMascota } = require( '../controllers/tratamientos-mascotas.controller' );

// ****************************************************
// - End points para los tratamientos de los caballos -
// ****************************************************

router.get( '/caballos', obtenerTratamientosCaballos );

router.get( '/caballos/:idCaballo', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], obtenerTratamientoCaballoById );

router.post( '/caballos/:idCaballo', [
    validarJWT,
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    check( 'tratamiento', 'El tratamiento es obligatorio.' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción es obligatoria.' ).escape().trim().notEmpty(),
    validarCampos
], registrarTratamientoCaballo );

router.put( '/caballos/:idTratamiento', [
    validarJWT,
    check( 'idTratamiento', 'No es un id válido' ).isMongoId(),
    check( 'idTratamiento' ).custom( existeTratamiento ),
    validarCampos
], actualizarTratamientoCaballo );

// ****************************************************
// - End points para los tratamientos de los borregos -
// ****************************************************

router.get( '/borregos', obtenerTratamientosBorregos );

router.get( '/borregos/:idBorrego', [
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    validarCampos
], obtenerTratamientoBorregoById );

router.post( '/borregos/:idBorrego', [
    validarJWT,
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    check( 'tipo', 'El tipo de tratamiento es obligatorio.' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción del tratamiento es obligatoria.' ).escape().trim().notEmpty(),
    check( 'video', 'El link del video es obligatorio.' ).escape().trim().notEmpty(),
    validarCampos
], registrarTratamientoBorrego );

router.put( '/borregos/:idTratamiento', [
    validarJWT,
    check( 'idTratamiento', 'No es un id válido' ).isMongoId(),
    check( 'idTratamiento' ).custom( existeTratamientoBorrego ),
    validarCampos
], actualizarTratamientoBorrego );

// ****************************************************
// - End points para los tratamientos de las mascotas -
// ****************************************************

router.get( '/mascotas', obtenerTratamientosMascotas );

router.get( '/mascotas/:idMascota', [
    check( 'idMascota', 'No es un id válido' ).isMongoId(),
    check( 'idMascota' ).custom( existeMascota ),
    validarCampos
], obtenerTratamientoMascotaById );

router.post( '/mascotas/:idMascota', [
    validarJWT,
    check( 'idMascota', 'No es un id válido' ).isMongoId(),
    check( 'idMascota' ).custom( existeMascota ),
    check( 'tipo', 'El tipo de tratamiento es obligatorio.' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción del tratamiento es obligatoria.' ).escape().trim().notEmpty(),
    check( 'video', 'El link del video es obligatorio.' ).escape().trim().notEmpty(),
    validarCampos
], registrarTratamientoMascota );

router.put( '/mascotas/:idTratamiento', [
    validarJWT,
    check( 'idTratamiento', 'No es un id válido' ).isMongoId(),
    check( 'idTratamiento' ).custom( existeTratamientoMascota ),
    validarCampos
], actualizarTratamientoMascota );

module.exports = router;