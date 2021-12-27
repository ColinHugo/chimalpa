const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeConejo } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerConejos, obtenerConejoById, registrarConejo, 
        actualizarConejo, eliminarConejo } = require( '../controllers/conejos.controller' );

router.get( '/', obtenerConejos );

router.get( '/:idConejo', [
    check( 'idConejo', 'No es un id válido' ).isMongoId(),
    check( 'idConejo' ).custom( existeConejo ),
    validarCampos
], obtenerConejoById );

router.post( '/', [
    validarJWT,
    check( 'numeroConejo', 'El número del conejo es obligatorio' ).escape().trim().notEmpty(),
    check( 'tipo', 'El tipo del conejo es obligatorio' ).escape().trim().notEmpty(),
    check( 'raza', 'La raza del conejo es obligatoria' ).escape().trim().notEmpty(),
    check( 'color', 'El color del conejo es obligatorio' ).escape().trim().notEmpty(),
    check( 'sexo', 'El sexo del conejo es obligatorio' ).escape().trim().notEmpty(),
    validarCampos
], registrarConejo );

router.put( '/:idConejo', [
    validarJWT,
    check( 'idConejo', 'No es un id válido' ).isMongoId(),
    check( 'idConejo' ).custom( existeConejo ),
    validarCampos
], actualizarConejo );

router.delete( '/:idConejo', [
    validarJWT,
    check( 'idConejo', 'No es un id válido' ).isMongoId(),
    check( 'idConejo' ).custom( existeConejo ),
    validarCampos
], eliminarConejo );

module.exports = router;