const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { validarCampos, validarJWT } = require( '../middlewares' );

const { existeCaballo, existeTratamiento } = require( '../helpers/db-validators' );

const { obtenerTratamientos, obtenerTratamientoById,
        registrarTratamiento, actualizarTratamiento } = require( '../controllers/tratamientos.controller' );

router.get( '/caballos', obtenerTratamientos );

router.get( '/caballos/:idCaballo', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], obtenerTratamientoById );

router.post( '/caballos/:idCaballo', [
    validarJWT,
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    check( 'tratamiento', 'El tratamiento es obligatorio.' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción es obligatoria.' ).escape().trim().notEmpty(),
    check( 'frecuencia', 'La frecuencia es obligatoria.' ).escape().trim().notEmpty(),
    validarCampos
], registrarTratamiento );

router.put( '/caballos/:idTratamiento', [
    validarJWT,
    check( 'idTratamiento', 'No es un id válido' ).isMongoId(),
    check( 'idTratamiento' ).custom( existeTratamiento ),
    validarCampos
], actualizarTratamiento );

module.exports = router;