const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeCaballo, existeHistoriaClinicaCaballo } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerHistoriaClinicaCaballos, obtenerHistoriaClinicaCaballoById,
    registrarHistoriaClinicaCaballo, actualizarHistoriaClinicaCaballo } = require( '../controllers/historia-clinica.controller' );

// * * * * * * * * * * C A B A L L O S * * * * * * * * * *

router.get( '/caballos', obtenerHistoriaClinicaCaballos );

router.get( '/caballos/:idCaballo', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], obtenerHistoriaClinicaCaballoById );

router.post( '/caballos/:idCaballo', [
    validarJWT,
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    check( 'estadoNutricional', 'El estado nutricional es obligatorio' ).escape().trim().notEmpty(),
    check( 'piel', 'El estado de la piel es obligatorio' ).escape().trim().notEmpty(),
    check( 'pelo', 'El estado del pelo es obligatorio' ).escape().trim().notEmpty(),
    check( 'sensorio', 'El estado sensorial es obligatorio' ).escape().trim().notEmpty(),
    check( 'faciales', 'El estado facial es obligatorio' ).escape().trim().notEmpty(),
    check( 'actitudes', 'Las actitudes son obligatorias' ).escape().trim().notEmpty(),
    check( 'deformaciones', 'Las deformaciones evidentes son obligatorias' ).escape().trim().notEmpty(),
    check( 'hallazgos', 'Los hallazgos notables son obligatorios' ).escape().trim().notEmpty(),
    check( 'mucosa', 'El estado de la mucosa es obligatoria' ).escape().trim().notEmpty(),
    check( 'llenadoCapilar', 'El llenado capilar es obligatorio' ).escape().trim().notEmpty(),
    check( 'linfonodos', 'La exploración de los linfónodos superficiales es obligatoria' ).escape().trim().notEmpty(),
    check( 'corazon', 'El pulso y frecuencia cardiaca son obligatorias' ).escape().trim().notEmpty(),
    check( 'respiracion', 'Tipo y frecuencia respiratoria son sobligatorios' ).escape().trim().notEmpty(),
    check( 'pulmones', 'Los campos pulmonares son obligatorios' ).escape().trim().notEmpty(),
    check( 'hidratacion', 'El estado de hidratación es obligatorio' ).escape().trim().notEmpty(),
    check( 'temperatura', 'La temperatura es obligatoria' ).escape().trim().notEmpty(),
    check( 'sonidosIntestinales', 'Los sonidos intestinales son obligatorios' ).escape().trim().notEmpty(),
    check( 'heces', 'El estado de la hece es obligatoria' ).escape().trim().notEmpty(),
    check( 'aparatoRespiratorio', 'El aparato respiratorio es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoCardiovascular', 'El aparato cardiovascular es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenDermatologico', 'El examen dermatologico es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoDigestivo', 'El aparato digestivo es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoUrinario', 'El aparato urinario es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoReproductor', 'El aparato reproductor es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenOftalmologico', 'El examen oftamologico es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenOtologico', 'El examen otológico es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoLocomotor', 'El aparato locomotor es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenNeurologico', 'El examen neurológico es obligatorio' ).escape().trim().notEmpty(),
    check( 'pronostico', 'El pronóstico es obligatorio' ).escape().trim().notEmpty(),
    check( 'tratamiento', 'El tratamiento es obligatorio' ).escape().trim().notEmpty(),
    validarCampos
], registrarHistoriaClinicaCaballo );

router.put( '/caballos/:idHistorial', [
    validarJWT,
    check( 'idHistorial', 'No es un id válido' ).isMongoId(),
    check( 'idHistorial' ).custom( existeHistoriaClinicaCaballo ),
    validarCampos
], actualizarHistoriaClinicaCaballo )

module.exports = router;