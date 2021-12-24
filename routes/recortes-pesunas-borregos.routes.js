const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeBorrego, existeRecortePesunaBorrego } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerRecortesPesunasBorregos, obtenerRecortePesunaBorregoById, 
        registrarRecortePesunaBorrego, actualizarRecortePesunaBorrego } = require( '../controllers/recortes-pesunas-borregos.controller' );

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
    check( 'fecha', 'La fecha del casco es obligatoria' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción del recorte es obligatoria' ).escape().trim().notEmpty(),
    validarCampos
], registrarRecortePesunaBorrego );

router.put( '/borregos/:idPesunaBorrego', [
    validarJWT,
    check( 'idPesunaBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idPesunaBorrego' ).custom( existeRecortePesunaBorrego ),
    validarCampos
], actualizarRecortePesunaBorrego )

module.exports = router;