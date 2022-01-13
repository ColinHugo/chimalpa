const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeCapacitacion } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerCapacitaciones, registrarCapacitacion, 
        actualizarCapacitacion, eliminarCapacitacion } = require( '../controllers/capacitacion' );

router.get( '/', obtenerCapacitaciones );

router.post( '/', [
    validarJWT,
    check( 'descripcion', 'La descripción del video es obligatoria.' ).escape().trim().notEmpty(),
    check( 'video', 'El link del video es obligatorio.' ).trim().notEmpty(),
    validarCampos
], registrarCapacitacion );

router.put( '/:idCapacitacion', [
    validarJWT,
    check( 'idCapacitacion', 'No es un id válido' ).isMongoId(),
    check( 'idCapacitacion' ).custom( existeCapacitacion ),
    validarCampos
], actualizarCapacitacion );

router.delete( '/:idCapacitacion', [
    validarJWT,
    check( 'idCapacitacion', 'No es un id válido' ).isMongoId(),
    check( 'idCapacitacion' ).custom( existeCapacitacion ),
    validarCampos
], eliminarCapacitacion );

module.exports = router;