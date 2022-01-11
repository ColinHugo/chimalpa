const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { validarCampos, validarJWT } = require( '../middlewares' );
const { existeAve, existeMedicinaAve,
        existeBorrego, existeMedicinaBorrego,
        existeCaballo, existeMedicinaPreventiva,
        existeConejo, existeMedicinaConejo,
        existeMascota, existeMedicinaMascota } = require( '../helpers/db-validators' );

const { obtenerMedicinaAve, obtenerMedicinaAveById,
        registrarMedicinaAve, actualizarMedicinaAve } = require( '../controllers/medicinas-aves.controller' );

const { obtenerMedicinaBorrego, obtenerMedicinaBorregoById,
        registrarMedicinaBorrego, actualizarMedicinaBorrego } = require( '../controllers/medicinas-borregos.controller' );

const { obtenerMedicinaPreventiva, obtenerMedicinaPreventivaById,
        registrarMedicinaPreventiva, actualizarMedicinaPreventiva } = require( '../controllers/medicinas-preventivas.controller' );

const { obtenerMedicinaConejo, obtenerMedicinaConejoById,
        registrarMedicinaConejo, actualizarMedicinaConejo } = require( '../controllers/medicinas-conejos.controller' );

const { obtenerMedicinaMascota, obtenerMedicinaMascotaById,
        registrarMedicinaMascota, actualizarMedicinaMascota } = require( '../controllers/medicinas-mascotas.controller' );

// ****************************************************
// -     End points para las medicinas de las aves    -
// ****************************************************
// * * * * * * * * * A V E S * * * * * * * * * *

router.get( '/aves', obtenerMedicinaAve );

router.get( '/aves/:idAve', [
    check( 'idAve', 'No es un id válido' ).isMongoId(),
    check( 'idAve' ).custom( existeAve ),
    validarCampos
], obtenerMedicinaAveById );

router.post( '/aves/:idAve', [
    validarJWT,
    check( 'idAve', 'No es un id válido' ).isMongoId(),
    check( 'idAve' ).custom( existeAve ),
    check( 'tipo', 'El tipo de medicina es obligatorio' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción es obligatoria' ).escape().trim().notEmpty(),
    check( 'fecha', 'La fecha es obligatoria' ).trim().notEmpty(),
    validarCampos
], registrarMedicinaAve );

router.put( '/aves/:idMedicina', [
    validarJWT,
    check( 'idMedicina', 'No es un id válido' ).isMongoId(),
    check( 'idMedicina' ).custom( existeMedicinaAve ),
    validarCampos
], actualizarMedicinaAve );

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

// ****************************************************
// -   End points para las medicinas de las mascotas  -
// ****************************************************
// * * * * * * * * * * M A S C O T A S * * * * * * * * * *

router.get( '/mascotas', obtenerMedicinaMascota );

router.get( '/mascotas/:idMascota', [
    check( 'idMascota', 'No es un id válido' ).isMongoId(),
    check( 'idMascota' ).custom( existeMascota ),
    validarCampos
], obtenerMedicinaMascotaById );

router.post( '/mascotas/:idMascota', [
    validarJWT,
    check( 'idMascota', 'No es un id válido' ).isMongoId(),
    check( 'idMascota' ).custom( existeMascota ),
    check( 'tipo', 'El tipo de medicina es obligatorio' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción es obligatoria' ).escape().trim().notEmpty(),
    check( 'fecha', 'La fecha es obligatoria' ).trim().notEmpty(),
    validarCampos
], registrarMedicinaMascota );

router.put( '/mascotas/:idMedicina', [
    validarJWT,
    check( 'idMedicina', 'No es un id válido' ).isMongoId(),
    check( 'idMedicina' ).custom( existeMedicinaMascota ),
    validarCampos
], actualizarMedicinaMascota );

module.exports = router;