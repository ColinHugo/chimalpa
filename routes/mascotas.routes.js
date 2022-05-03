const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeMascota } = require( '../helpers' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const {
    obtenerMascotas,
    obtenerMascotaById,
    registrarMascota,
    actualizarMascota,
    eliminarMascota
} = require( '../controllers/mascotas.controller' );

router.get( '/', obtenerMascotas );

router.get( '/:idMascota', [
    check( 'idMascota', 'No es un id válido' ).isMongoId(),
    check( 'idMascota' ).custom( existeMascota ),
    validarCampos
], obtenerMascotaById );

router.post( '/', [
    validarJWT,
    check( 'nombre', 'El nombre de la mascota es obligatorio' ).escape().trim().notEmpty(),
    check( 'raza', 'La raza de la mascota es obligatoria' ).escape().trim().notEmpty(),
    check( 'sexo', 'El sexo de la mascota es obligatorio' ).escape().trim().notEmpty(),
    check( 'fechaNacimiento', 'Ingrese una fecha válida' ).escape().trim().isDate(),
    check( 'uso', 'El uso de la mascota es obligatorio' ).escape().trim().notEmpty(),
    check( 'precio', 'Ingrese una cantidad válida' ).escape().trim().isNumeric(),
    validarCampos
], registrarMascota );

router.put( '/:idMascota', [
    validarJWT,
    check( 'idMascota', 'No es un id válido' ).isMongoId(),
    check( 'idMascota' ).custom( existeMascota ),
    check( 'nombre', 'El nombre de la mascota es obligatorio' ).escape().trim().notEmpty(),
    check( 'raza', 'La raza de la mascota es obligatoria' ).escape().trim().notEmpty(),
    check( 'sexo', 'El sexo de la mascota es obligatorio' ).escape().trim().notEmpty(),
    check( 'fechaNacimiento', 'Ingrese una fecha válida' ).escape().trim().isDate(),
    check( 'uso', 'El uso de la mascota es obligatorio' ).escape().trim().notEmpty(),
    check( 'precio', 'Ingrese una cantidad válida' ).escape().trim().isNumeric(),
    validarCampos
], actualizarMascota );

router.delete( '/:idMascota', [
    validarJWT,
    check( 'idMascota', 'No es un id válido' ).isMongoId(),
    check( 'idMascota' ).custom( existeMascota ),
    validarCampos
], eliminarMascota );

module.exports = router;