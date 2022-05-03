const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { validarCampos, validarJWT } = require( '../middlewares' );

const {
    existeHistorialReproductivoCaballo,
    existeMonta,
    existeUsuario
} = require( '../helpers' );

const {
    obtenerMontaCaballoById,
    registrarMontaCaballo,
    actualizarMontaCaballo,
    eliminarMontaCaballo
} = require( '../controllers/montas-caballos.controller' );

router.get( '/caballos/:idHistorialReproductivo', [
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoCaballo ),
    validarCampos
], obtenerMontaCaballoById );

router.post( '/caballos/:idHistorialReproductivo/:idEncargado', [
    validarJWT,
    check( 'idHistorialReproductivo', 'No es un id válido' ).isMongoId(),
    check( 'idHistorialReproductivo' ).custom( existeHistorialReproductivoCaballo ),
    check( 'idEncargado', 'No es un id válido' ).isMongoId(),
    check( 'idEncargado' ).custom( existeUsuario ),
    check( 'fechaMonta', 'Ingrese una fecha para la monta válida.' ).escape().trim().notEmpty().isDate(),
    validarCampos
], registrarMontaCaballo );

router.put( '/caballos/:idMonta', [
    validarJWT,
    check( 'idMonta', 'No es un id válido' ).isMongoId(),
    check( 'idMonta' ).custom( existeMonta ),
    validarCampos
], actualizarMontaCaballo );

router.delete( '/caballos/:idMonta', [
    validarJWT,
    check( 'idMonta', 'No es un id válido' ).isMongoId(),
    check( 'idMonta' ).custom( existeMonta ),
    validarCampos
], eliminarMontaCaballo );

module.exports = router;