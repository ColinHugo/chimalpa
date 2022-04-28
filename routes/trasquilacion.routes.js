const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeBorrego, existeTrasquilacionBorrego } = require( '../helpers' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const {
    obtenerTrasquilacionBorregos,
    obtenerTrasquilacionBorregoById,
    registrarTrasquilacionBorrego,
    actualizarTrasquilacionBorrego,
    eliminarTrasquilacionBorrego
} = require( '../controllers/trasquilacion-borregos.controller' );

router.get( '/borregos', obtenerTrasquilacionBorregos );

router.get( '/borregos/:idBorrego', [
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    validarCampos
], obtenerTrasquilacionBorregoById );

router.post( '/borregos/:idBorrego', [
    validarJWT,
    check( 'idBorrego', 'No es un id válido.' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    check( 'descripcion', 'La descripción de la trasquilación del borrego es obligatoria.' ).escape().trim().notEmpty(),
    check( 'ultimaFecha', 'Ingrese una última fecha válida.' ).escape().trim().isDate(),
    check( 'proximaFecha', 'Ingrese una próxima fecha válida.' ).escape().trim().isDate(),
    validarCampos
], registrarTrasquilacionBorrego );

router.put( '/borregos/:idTrasquilacionBorrego', [
    validarJWT,
    check( 'idTrasquilacionBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idTrasquilacionBorrego' ).custom( existeTrasquilacionBorrego ),
    check( 'descripcion', 'La descripción de la trasquilación del borrego es obligatoria.' ).escape().trim().notEmpty(),
    check( 'ultimaFecha', 'Ingrese una última fecha válida.' ).escape().trim().isDate(),
    check( 'proximaFecha', 'Ingrese una próxima fecha válida.' ).escape().trim().isDate(),
    validarCampos
], actualizarTrasquilacionBorrego );

router.delete( '/borregos/:idTrasquilacionBorrego', [
    validarJWT,
    check( 'idTrasquilacionBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idTrasquilacionBorrego' ).custom( existeTrasquilacionBorrego ),
    validarCampos
], eliminarTrasquilacionBorrego );

module.exports = router;