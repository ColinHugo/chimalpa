const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeCaballo, existeAlerta } = require( '../helpers' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerAlertas, registrarAlerta, actualizarAlerta, 
        eliminarAlerta } = require( '../controllers/alertas.controller' );

router.get( '/', obtenerAlertas );

router.post( '/:idCaballo', [
    validarJWT,
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    check( 'descripcion', 'La descripción de la alerta es obligatoria' ).escape().trim().notEmpty(),
    validarCampos
], registrarAlerta );

router.put( '/:idAlerta', [
    validarJWT,
    check( 'idAlerta', 'No es un id válido' ).isMongoId(),
    check( 'idAlerta' ).custom( existeAlerta ),
    validarCampos
], actualizarAlerta );

router.delete( '/:idAlerta', [
    validarJWT,
    check( 'idAlerta', 'No es un id válido' ).isMongoId(),
    check( 'idAlerta' ).custom( existeAlerta ),
    validarCampos
], eliminarAlerta );

module.exports = router;