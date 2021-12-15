const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeCaballo, existeOdontologia } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerOdontologiaCaballos, obtenerOdontologiaCaballoById, 
        registrarOdontologiaCaballo, actualizarOdontologiaCaballo } = require( '../controllers/odontologia.controller' );

router.get( '/caballos', obtenerOdontologiaCaballos );

router.get( '/caballos/:idCaballo', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], obtenerOdontologiaCaballoById );

router.post( '/caballos/:idCaballo', [
    validarJWT,
    check( 'tratamiento', 'El tratamiento es obligatorio' ).escape().trim().notEmpty(), 
    check( 'descripcion', 'La descripción es obligatoria' ).escape().trim().notEmpty(), 
    check( 'frecuencia', 'La frecuencia es obligatoria' ).escape().trim().notEmpty(), 
    validarCampos
], registrarOdontologiaCaballo );

router.put( '/caballos/:idOdontologia', [
    validarJWT,
    check( 'idOdontologia' ).custom( existeOdontologia ),
    validarCampos
], actualizarOdontologiaCaballo );

module.exports = router;