const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { validarCampos, validarJWT } = require( '../middlewares' );
const { existeCaballo, existeMedicinaPreventiva } = require( '../helpers/db-validators' );

const { obtenerMedicinaPreventiva, obtenerMedicinaPreventivaById,
        registrarMedicinaPreventiva, actualizarMedicinaPreventiva } = require( '../controllers/medicinas-preventivas.controller' );

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

module.exports = router;