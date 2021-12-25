const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { validarCampos, validarJWT } = require( '../middlewares' );
const { existeCaballo, existeMedicinaPreventiva,
        existeBorrego, existeMedicinaBorrego } = require( '../helpers/db-validators' );

const { obtenerMedicinaBorrego, obtenerMedicinaBorregoById,
        registrarMedicinaBorrego, actualizarMedicinaBorrego } = require( '../controllers/medicinas-borregos.controller' );

const { obtenerMedicinaPreventiva, obtenerMedicinaPreventivaById,
        registrarMedicinaPreventiva, actualizarMedicinaPreventiva } = require( '../controllers/medicinas-preventivas.controller' );

// ****************************************************
// -   End points para las medicinas de los caballos  -
// ****************************************************

router.get( '/caballos', obtenerMedicinaPreventiva );

router.get( '/caballos/:idCaballo', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], obtenerMedicinaPreventivaById );

router.post( '/caballos/:idCaballo', [
    validarJWT,
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    check( 'tipoMedicina', 'El tipo de medicina es obligatorio' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción es obligatoria' ).escape().trim().notEmpty(),
    check( 'fecha', 'La fecha es obligatoria' ).trim().notEmpty(),
    validarCampos
], registrarMedicinaPreventiva );

router.put( '/caballos/:idMedicina', [
    validarJWT,
    check( 'idMedicina', 'No es un id válido' ).isMongoId(),
    check( 'idMedicina' ).custom( existeMedicinaPreventiva ),
    validarCampos
], actualizarMedicinaPreventiva );

// ****************************************************
// -   End points para las medicinas de los borregos  -
// ****************************************************

router.get( '/borregos', obtenerMedicinaBorrego );

router.get( '/borregos/:idBorrego', [
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    validarCampos
], obtenerMedicinaBorregoById );

router.post( '/borregos/:idBorrego', [
    validarJWT,
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    check( 'tipo', 'El tipo de medicina es obligatorio' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción es obligatoria' ).escape().trim().notEmpty(),
    check( 'fecha', 'La fecha es obligatoria' ).trim().notEmpty(),
    validarCampos
], registrarMedicinaBorrego );

router.put( '/borregos/:idMedicina', [
    validarJWT,
    check( 'idMedicina', 'No es un id válido' ).isMongoId(),
    check( 'idMedicina' ).custom( existeMedicinaBorrego ),
    validarCampos
], actualizarMedicinaBorrego );

module.exports = router;