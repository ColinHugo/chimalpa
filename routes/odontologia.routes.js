const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeCaballo, existeOdontologia } = require( '../helpers' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const {
    obtenerOdontologiaCaballos,
    obtenerOdontologiaCaballoById,
    registrarOdontologiaCaballo,
    actualizarOdontologiaCaballo,
    eliminarOdontologiaCaballo
} = require( '../controllers/odontologia.controller' );

router.get( '/caballos', obtenerOdontologiaCaballos );

router.get( '/caballos/:idCaballo', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], obtenerOdontologiaCaballoById );

router.post( '/caballos/:idCaballo', [
    validarJWT,
    check( 'idCaballo' ).custom( existeCaballo ),
    check( 'tratamiento', 'El tratamiento es obligatorio.' ).escape().trim().notEmpty(), 
    check( 'descripcion', 'La descripción es obligatoria.' ).escape().trim().notEmpty(), 
    check( 'ultimaFecha', 'Ingrese una última fecha válida.' ).escape().trim().notEmpty().isDate(),
    check( 'proximaFecha', 'Ingrese una próxima fecha válida.' ).escape().trim().notEmpty().isDate(),
    validarCampos
], registrarOdontologiaCaballo );

router.put( '/caballos/:idOdontologia', [
    validarJWT,
    check( 'idOdontologia' ).custom( existeOdontologia ),
    check( 'tratamiento', 'El tratamiento es obligatorio.' ).escape().trim().notEmpty(), 
    check( 'descripcion', 'La descripción es obligatoria.' ).escape().trim().notEmpty(), 
    check( 'ultimaFecha', 'Ingrese una última fecha válida..' ).escape().trim().notEmpty().isDate(),
    check( 'proximaFecha', 'Ingrese una próxima fecha válida.' ).escape().trim().notEmpty().isDate(),
    validarCampos
], actualizarOdontologiaCaballo );

router.delete( '/caballos/:idOdontologia', [
    validarJWT,
    check( 'idOdontologia' ).custom( existeOdontologia ),
    validarCampos
], eliminarOdontologiaCaballo );

module.exports = router;