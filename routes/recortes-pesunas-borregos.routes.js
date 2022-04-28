const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeBorrego, existeRecortePesunaBorrego } = require( '../helpers' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const {
    obtenerRecortesPesunasBorregos,
    obtenerRecortePesunaBorregoById,
    registrarRecortePesunaBorrego,
    actualizarRecortePesunaBorrego,
    eliminarRecortePesunaBorrego
} = require( '../controllers/recortes-pesunas-borregos.controller' );

router.get( '/borregos', obtenerRecortesPesunasBorregos );

router.get( '/borregos/:idBorrego', [
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    validarCampos
], obtenerRecortePesunaBorregoById );

router.post( '/borregos/:idBorrego', [
    validarJWT,
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    check( 'descripcion', 'La descripción del recorte es obligatoria' ).escape().trim().notEmpty(),
    check( 'ultimaFecha', 'Ingrese una última fecha válida.' ).escape().trim().isDate(),
    check( 'proximaFecha', 'Ingrese una próxima fecha válida.' ).escape().trim().isDate(),
    validarCampos
], registrarRecortePesunaBorrego );

router.put( '/borregos/:idPesunaBorrego', [
    validarJWT,
    check( 'idPesunaBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idPesunaBorrego' ).custom( existeRecortePesunaBorrego ),
    check( 'descripcion', 'La descripción del recorte es obligatoria' ).escape().trim().notEmpty(),
    check( 'ultimaFecha', 'Ingrese una última fecha válida.' ).escape().trim().isDate(),
    check( 'proximaFecha', 'Ingrese una próxima fecha válida.' ).escape().trim().isDate(),
    validarCampos
], actualizarRecortePesunaBorrego );

router.delete( '/borregos/:idPesunaBorrego', [
    validarJWT,
    check( 'idPesunaBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idPesunaBorrego' ).custom( existeRecortePesunaBorrego ),
    validarCampos
], eliminarRecortePesunaBorrego );

module.exports = router;