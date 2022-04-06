const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeUsuario, emailExiste } = require( '../helpers' );
const { validarCampos } = require( '../middlewares' );

const { obtenerUsuarios, obtenerUsuarioById, agregarUsuario, actualizarUsuario, 
        eliminarUsuario } = require( '../controllers/usuarios.controller' );

router.get( '/', obtenerUsuarios );

router.get( '/:idUsuario', [
    check( 'idUsuario', 'No es un id válido' ).isMongoId(),
    check( 'idUsuario' ).custom( existeUsuario ),
    validarCampos
], obtenerUsuarioById );

router.post( '/', [
    check( 'nombre', 'El nombre es obligatorio' ).escape().trim().notEmpty(),
    check( 'apellidos', 'Los apellidos son obligatorios' ).escape().trim().notEmpty(),
    check( 'correo', 'El correo es obligatorio' ).escape().trim().notEmpty(),
    check( 'correo', 'Ingrese un correo válido' ).escape().trim().isEmail(),
    check( 'correo' ).custom( emailExiste ),
    check( 'password', 'El password es obligatorio' ).escape().trim().notEmpty(),
    check( 'password', 'El password debe tener al menos 5 caracteres' ).escape().trim().isLength( { min: 5 } ),
    validarCampos
], agregarUsuario );

router.put( '/:idUsuario', [
    check( 'idUsuario', 'No es un id válido' ).isMongoId(),
    check( 'idUsuario' ).custom( existeUsuario ),
    validarCampos
], actualizarUsuario );

router.delete( '/:idUsuario', [
    check( 'idUsuario', 'No es un id válido' ).isMongoId(),
    check( 'idUsuario' ).custom( existeUsuario ),
    validarCampos
], eliminarUsuario );

module.exports = router;