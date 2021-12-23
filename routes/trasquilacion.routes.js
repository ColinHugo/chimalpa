const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeBorrego, existeTrasquilacionBorrego } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerTrasquilacionBorregos, obtenerTrasquilacionBorregoById,
        registrarTrasquilacionBorrego, actualizarTrasquilacionBorrego } = require( '../controllers/trasquilacion-borregos.controller' );

router.get( '/borregos', obtenerTrasquilacionBorregos );

router.get( '/borregos/:idBorrego', [
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    validarCampos
], obtenerTrasquilacionBorregoById );

router.post( '/borregos/:idBorrego', [
    validarJWT,
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    check( 'fecha', 'La fecha de la trasquilación del borrego es obligatoria' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción de la trasquilación del borrego es obligatoria' ).escape().trim().notEmpty(),
    validarCampos
], registrarTrasquilacionBorrego );

router.put( '/borregos/:idTrasquilacionBorrego', [
    validarJWT,
    check( 'idTrasquilacionBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idTrasquilacionBorrego' ).custom( existeTrasquilacionBorrego ),
    validarCampos
], actualizarTrasquilacionBorrego );

module.exports = router;