const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeUsuario, existeTarea } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerTareas, obtenerTareaById, registrarTarea, 
        actualizarTarea, eliminarTarea } = require( '../controllers/tareas.controller' );

router.get( '/:estado', obtenerTareas );

router.get( '/:idEmpleado/:estado', [
    check( 'idEmpleado', 'No es un id válido' ).isMongoId(),
    check( 'idEmpleado' ).custom( existeUsuario ),
    validarCampos
], obtenerTareaById );

router.post( '/:idEmpleado', [
    validarJWT,
    check( 'idEmpleado', 'No es un id válido' ).isMongoId(),
    check( 'idEmpleado' ).custom( existeUsuario ),
    check( 'nombre', 'El nombre de la tarea es obligatorio' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción de la tarea es obligatorio' ).escape().trim().notEmpty(),
    validarCampos
], registrarTarea );

router.put( '/:idTarea', [
    validarJWT,
    check( 'idTarea', 'No es un id válido' ).isMongoId(),
    check( 'idTarea' ).custom( existeTarea ),
    validarCampos
], actualizarTarea );

router.delete( '/:idTarea', [
    validarJWT,
    check( 'idTarea', 'No es un id válido' ).isMongoId(),
    check( 'idTarea' ).custom( existeTarea ),
    validarCampos
], eliminarTarea );

module.exports = router;