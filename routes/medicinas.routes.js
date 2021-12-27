const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { validarCampos, validarJWT } = require( '../middlewares' );
const { existeCaballo, existeMedicinaPreventiva,
        existeBorrego, existeMedicinaBorrego, 
        existeConejo, existeMedicinaConejo } = require( '../helpers/db-validators' );

const { obtenerMedicinaBorrego, obtenerMedicinaBorregoById,
        registrarMedicinaBorrego, actualizarMedicinaBorrego } = require( '../controllers/medicinas-borregos.controller' );

const { obtenerMedicinaPreventiva, obtenerMedicinaPreventivaById,
        registrarMedicinaPreventiva, actualizarMedicinaPreventiva } = require( '../controllers/medicinas-preventivas.controller' );

const { obtenerMedicinaConejo, obtenerMedicinaConejoById,
        registrarMedicinaConejo, actualizarMedicinaConejo } = require( '../controllers/medicinas-conejos.controller' );

// ****************************************************
// -   End points para las medicinas de los borregos  -
// ****************************************************
// * * * * * * * * * B O R R E G O S * * * * * * * * * *

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

// ****************************************************
// -   End points para las medicinas de los caballos  -
// ****************************************************
// * * * * * * * * * * C A B A L L O S * * * * * * * * * *

router.get( '/borregos', obtenerMedicinaPreventiva );

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
// -   End points para las medicinas de los conejos  -
// ****************************************************
// * * * * * * * * * * C O N E J O S * * * * * * * * * *

router.get( '/conejos', obtenerMedicinaConejo );

router.get( '/conejos/:idConejo', [
    check( 'idConejo', 'No es un id válido' ).isMongoId(),
    check( 'idConejo' ).custom( existeConejo ),
    validarCampos
], obtenerMedicinaConejoById );

router.post( '/conejos/:idConejo', [
    validarJWT,
    check( 'idConejo', 'No es un id válido' ).isMongoId(),
    check( 'idConejo' ).custom( existeConejo ),
    check( 'tipo', 'El tipo de medicina es obligatorio' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción es obligatoria' ).escape().trim().notEmpty(),
    check( 'fecha', 'La fecha es obligatoria' ).trim().notEmpty(),
    validarCampos
], registrarMedicinaConejo );

router.put( '/conejos/:idMedicina', [
    validarJWT,
    check( 'idMedicina', 'No es un id válido' ).isMongoId(),
    check( 'idMedicina' ).custom( existeMedicinaConejo ),
    validarCampos
], actualizarMedicinaConejo );

module.exports = router;