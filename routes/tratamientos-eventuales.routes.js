const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { validarCampos, validarJWT } = require( '../middlewares' );

const { existeCaballo, existeTratamientoEventual } = require( '../helpers' );

const { 
    obtenerTratamientoEventualCaballoById,
    registrarTratamientoEventualCaballo,
    actualizarTratamientoEventualCaballo,
    eliminarTratamientoEventualCaballo
} = require( '../controllers/tratamientos-eventuales-caballos.controller' );

router.get( '/caballos/:idCaballo', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], obtenerTratamientoEventualCaballoById );

router.post( '/caballos/:idCaballo', [
    validarJWT,
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    check( 'tratamiento', 'El tratamiento es obligatorio.' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción es obligatoria.' ).escape().trim().notEmpty(),
    check( 'fechaInicio', 'Ingrese una fecha de inicio válido.' ).escape().trim().notEmpty().isDate(),
    check( 'fechaTermino', 'Ingrese una fecha de termino válido.' ).escape().trim().notEmpty().isDate(),
    validarCampos
], registrarTratamientoEventualCaballo );

router.put( '/caballos/:idTratamiento', [
    validarJWT,
    check( 'idTratamiento', 'No es un id válido' ).isMongoId(),
    check( 'idTratamiento' ).custom( existeTratamientoEventual ),
    validarCampos
], actualizarTratamientoEventualCaballo );

router.delete( '/caballos/:idTratamiento', [
    validarJWT,
    check( 'idTratamiento', 'No es un id válido' ).isMongoId(),
    check( 'idTratamiento' ).custom( existeTratamientoEventual ),
    validarCampos
], eliminarTratamientoEventualCaballo );

module.exports = router;