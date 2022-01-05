const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeUsuario, existeTarea } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerTareas, obtenerTareaById, registrarTarea, 
        actualizarTarea } = require( '../controllers/tareas.controller' );

router.get( '/', obtenerTareas );

router.get( '/:idUsuario', [
    check( 'idUsuario', 'No es un id válido' ).isMongoId(),
    check( 'idUsuario' ).custom( existeUsuario ),
    validarCampos
], obtenerTareaById );

router.post( '/:idUsuario', [
    validarJWT,
    check( 'idUsuario', 'No es un id válido' ).isMongoId(),
    check( 'idUsuario' ).custom( existeUsuario ),
    check( 'nombre', 'El nombre de la tarea es obligatorio' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción de la tarea es obligatorio' ).escape().trim().notEmpty(),
    check( 'encargado', 'El encargado de la tarea es obligatoria' ).escape().trim().notEmpty(),
    validarCampos
], registrarTarea );

router.put( '/:idTarea', [
    validarJWT,
    check( 'idTarea', 'No es un id válido' ).isMongoId(),
    check( 'idTarea' ).custom( existeTarea ),
    validarCampos
], actualizarTarea );

module.exports = router;