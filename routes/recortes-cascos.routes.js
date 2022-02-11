const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeCaballo, existeRecorteCasco } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerRecortes, obtenerRecorteById, 
        registrarRecorte, actualizarRecorte } = require( '../controllers/recortes-cascos.controller' );

router.get( '/caballos', obtenerRecortes );

router.get( '/caballos/:idCaballo', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], obtenerRecorteById );

router.post( '/caballos/:idCaballo', [
    validarJWT,
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    check( 'instrucciones', 'Las instrucciones del recorte del casco son obligatorias.' ).escape().trim().notEmpty(),
    validarCampos
], registrarRecorte );

router.put( '/caballos/:idCasco', [
    validarJWT,
    check( 'idCasco', 'No es un id válido' ).isMongoId(),
    check( 'idCasco' ).custom( existeRecorteCasco ),
    validarCampos
], actualizarRecorte )

module.exports = router;