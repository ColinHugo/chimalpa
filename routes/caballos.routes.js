const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeCaballo } = require( '../helpers/db-validators' );
const { validarCampos } = require( '../middlewares/validar-campos' );

const { obtenerCaballos, obtenerCaballoById, agregarCaballo, actualizarCaballo, eliminarCaballo } = require( '../controllers/caballos.controller' );

router.get( '/', obtenerCaballos );

router.get( '/:id', [
    check( 'id', 'No es un id válido' ).isMongoId(),
    check( 'id' ).custom( existeCaballo ),
    validarCampos
], obtenerCaballoById );

router.post( '/', [
    check( 'nombre', 'El nombre del caballo es obligatorio' ).notEmpty(),
    check( 'raza', 'La raza del caballo es obligatoria' ).notEmpty(),
    check( 'sexo', 'El sexo del caballo es obligatorio' ).notEmpty(),
    check( 'color', 'El color del caballo es obligatorio' ).notEmpty(),
    validarCampos
], agregarCaballo );

router.put( '/:id', [
    check( 'id', 'No es un id válido' ).isMongoId(),
    check( 'id' ).custom( existeCaballo ),
    validarCampos
], actualizarCaballo );

router.delete( '/:id', [
    check( 'id', 'No es un id válido' ).isMongoId(),
    check( 'id' ).custom( existeCaballo ),
    validarCampos
], eliminarCaballo );

module.exports = router;