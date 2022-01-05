const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeHerramienta } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerHerramientas, obtenerHerramientaById, registrarHerramienta, 
        actualizarHerramienta, eliminarHerramienta } = require( '../controllers/herramientas.controller' );

router.get( '/', obtenerHerramientas );

router.get( '/:idHerramienta', [
    check( 'idHerramienta', 'No es un id válido' ).isMongoId(),
    check( 'idHerramienta' ).custom( existeHerramienta ),
    validarCampos
], obtenerHerramientaById );

router.post( '/', [
    validarJWT,
    check( 'cantidad', 'La cantidad de herramientas es necesaria' ).escape().trim().notEmpty(),
    check( 'tipo', 'El tipo de herramienta es obligatoria' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción de herramienta es obligatoria' ).escape().trim().notEmpty(),
    validarCampos
], registrarHerramienta );

router.put( '/:idHerramienta', [
    validarJWT,
    check( 'idHerramienta', 'No es un id válido' ).isMongoId(),
    check( 'idHerramienta' ).custom( existeHerramienta ),
    validarCampos
], actualizarHerramienta );

router.delete( '/:idHerramienta', [
    validarJWT,
    check( 'idHerramienta', 'No es un id válido' ).isMongoId(),
    check( 'idHerramienta' ).custom( existeHerramienta ),
    validarCampos
], eliminarHerramienta );

module.exports = router;