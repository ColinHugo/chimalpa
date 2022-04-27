const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeCaballo, existeRecorteCasco } = require( '../helpers' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const {
    obtenerRecortes,
    obtenerRecorteById,
    registrarRecorte,
    actualizarRecorte,
    eliminarRecorte
} = require( '../controllers/recortes-cascos.controller' );

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
    check( 'ultimaFecha', 'Ingrese una última fecha válida.' ).escape().trim().notEmpty().isDate(),
    check( 'proximaFecha', 'Ingrese una próxima fecha válida.' ).escape().trim().notEmpty().isDate(),
    validarCampos
], registrarRecorte );

router.put( '/caballos/:idCasco', [
    validarJWT,
    check( 'idCasco', 'No es un id válido' ).isMongoId(),
    check( 'idCasco' ).custom( existeRecorteCasco ),
    check( 'instrucciones', 'Las instrucciones del recorte del casco son obligatorias.' ).escape().trim().notEmpty(),
    check( 'ultimaFecha', 'Ingrese una última fecha válida.' ).escape().trim().notEmpty().isDate(),
    check( 'proximaFecha', 'Ingrese una próxima fecha válida.' ).escape().trim().notEmpty().isDate(),
    validarCampos
], actualizarRecorte );

router.delete( '/caballos/:idCasco', [
    validarJWT,
    check( 'idCasco', 'No es un id válido' ).isMongoId(),
    check( 'idCasco' ).custom( existeRecorteCasco ),
    validarCampos
], eliminarRecorte );

module.exports = router;