const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { validarCampos, validarJWT } = require( '../middlewares' );

const { existeMonta, existeUltrasonido } = require( '../helpers' );

const { 
    obtenerUltrasonidoCaballoById,
    registrarUltraSonidoCaballo
} = require( '../controllers/ultrasonidos-caballos.controller' );

router.get( '/caballos/:idMonta', [
    check( 'idMonta', 'No es un id válido' ).isMongoId(),
    check( 'idMonta' ).custom( existeMonta ),
    validarCampos
], obtenerUltrasonidoCaballoById );

router.post( '/caballos/:idMonta', [
    validarJWT,
    check( 'idMonta', 'No es un id válido' ).isMongoId(),
    check( 'idMonta' ).custom( existeMonta ),
    check( 'diagnostico', 'El diagnóstico del utrasonido es obligatorio.' ).escape().trim().notEmpty(),
    validarCampos
], registrarUltraSonidoCaballo );

router.delete( '/caballos/:idUltraSonido', [
    validarJWT,
    check( 'idUltraSonido', 'No es un id válido' ).isMongoId(),
    check( 'idUltraSonido' ).custom( existeUltrasonido ),
    validarCampos
] );

module.exports = router;