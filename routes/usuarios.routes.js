const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeUsuario, emailExiste } = require( '../helpers/db-validators' );
const { validarCampos } = require( '../middlewares/validar-campos' );

const { obtenerUsuarios, obtenerUsuarioById, agregarUsuario, actualizarUsuario, 
        eliminarUsuario } = require( '../controllers/usuarios.controller' );

router.get( '/', obtenerUsuarios );

router.get( '/:id', [
    check( 'id', 'No es un id válido' ).isMongoId(),
    check( 'id' ).custom( existeUsuario ),
    validarCampos
], obtenerUsuarioById );

router.post( '/', [
    check( 'nombre', 'El nombre es obligatorio' ).escape().notEmpty(),
    check( 'correo', 'El correo es obligatorio' ).escape().notEmpty(),
    check( 'correo', 'Ingrese un correo válido' ).escape().isEmail(),
    check( 'correo' ).custom( emailExiste ),
    check( 'password', 'El password es obligatorio' ).escape().notEmpty(),
    check( 'password', 'El password debe tener al menos 5 caracteres' ).escape().isLength( { min: 5 } ),
    validarCampos
], agregarUsuario );

router.put( '/:id', [
    check( 'id', 'No es un id válido' ).isMongoId(),
    check( 'id' ).custom( existeUsuario ),
    validarCampos
], actualizarUsuario );

router.delete( '/:id', [
    check( 'id', 'No es un id válido' ).isMongoId(),
    check( 'id' ).custom( existeUsuario ),
    validarCampos
], eliminarUsuario );

module.exports = router;