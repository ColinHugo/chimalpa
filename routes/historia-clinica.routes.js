const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { 
    existeAve,
    existeHistoriaClinicaAve,
    existeBorrego,
    existeHistoriaClinicaBorrego,
    existeCaballo,
    existeHistoriaClinicaCaballo,
    existeConejo,
    existeHistoriaClinicaConejo,
    existeMascota,
    existeHistoriaClinicaMascota
} = require( '../helpers' );

const { validarCampos, validarJWT } = require( '../middlewares' );

const {
    obtenerHistoriaClinicaAves,
    obtenerHistoriaClinicaAveById,
    registrarHistoriaClinicaAve,
    actualizarHistoriaClinicaAve,
    eliminarHistoriaClinicaAve
} = require( '../controllers/historia-clinica-aves.controller' );

const {
    obtenerHistoriaClinicaBorregos,
    obtenerHistoriaClinicaBorregoById,
    registrarHistoriaClinicaBorrego,
    actualizarHistoriaClinicaBorrego,
    eliminarHistoriaClinicaBorrego
} = require( '../controllers/historia-clinica-borregos.controller' );

const {
    obtenerHistoriaClinicaCaballos,
    obtenerHistoriaClinicaCaballoById,
    registrarHistoriaClinicaCaballo,
    actualizarHistoriaClinicaCaballo,
    eliminarHistoriaClinicaCaballo
} = require( '../controllers/historia-clinica.controller' );

const {
    obtenerHistoriaClinicaConejos,
    obtenerHistoriaClinicaConejoById,
    registrarHistoriaClinicaConejo,
    actualizarHistoriaClinicaConejo
} = require( '../controllers/historia-clinica-conejos.controller' );

const {
    obtenerHistoriaClinicaMascotas,
    obtenerHistoriaClinicaMascotaById,
    registrarHistoriaClinicaMascota,
    actualizarHistoriaClinicaMascota
} = require( '../controllers/historia-clinica-mascota.controller' );

// **********************************************************
// -   End points para las historias clínicas de las aves   -
// **********************************************************
// * * * * * * * * * A V E S * * * * * * * * * *

router.get( '/aves', obtenerHistoriaClinicaAves );

router.get( '/aves/:idAve', [
    check( 'idAve', 'No es un id válido' ).isMongoId(),
    check( 'idAve' ).custom( existeAve ),
    validarCampos
], obtenerHistoriaClinicaAveById );

router.post( '/aves/:idAve', [
    validarJWT,
    check( 'idAve', 'No es un id válido' ).isMongoId(),
    check( 'idAve' ).custom( existeAve ),
    check( 'inspeccion', 'La inspección es obligatoria' ).escape().trim().notEmpty(),
    check( 'mucosa', 'El estado de la mucosa es obligatoria' ).escape().trim().notEmpty(),
    check( 'capilar', 'El llenado capilar es obligatorio' ).escape().trim().notEmpty(),
    check( 'linfonodos', 'La exploración de los linfónodos superficiales es obligatoria' ).escape().trim().notEmpty(),
    check( 'cardiaca', 'El pulso y frecuencia cardiaca son obligatorias' ).escape().trim().notEmpty(),
    check( 'respiratoria', 'Tipo y frecuencia respiratoria son sobligatorios' ).escape().trim().notEmpty(),
    check( 'pulmonares', 'Los campos pulmonares son obligatorios' ).escape().trim().notEmpty(),
    check( 'hidratacion', 'El estado de hidratación es obligatorio' ).escape().trim().notEmpty(),
    check( 'temperatura', 'La temperatura es obligatoria' ).escape().trim().notEmpty(),
    check( 'intestinales', 'Los sonidos intestinales son obligatorios' ).escape().trim().notEmpty(),
    check( 'heces', 'El estado de la hece es obligatoria' ).escape().trim().notEmpty(),
    check( 'aparatoRespiratorio', 'El aparato respiratorio es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoCardiovascular', 'El aparato cardiovascular es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenDermatologico', 'El examen dermatologico es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoDigestivo', 'El aparato digestivo es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoUrinario', 'El aparato urinario es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoReproductor', 'El aparato reproductor es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenOftalmologico', 'El examen oftamologico es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoLocomotor', 'El aparato locomotor es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenNeurologico', 'El examen neurológico es obligatorio' ).escape().trim().notEmpty(),
    check( 'tratamiento', 'El tratamiento es obligatorio' ).escape().trim().notEmpty(),
    check( 'pronostico', 'El pronóstico es obligatorio' ).escape().trim().notEmpty(),
    validarCampos
], registrarHistoriaClinicaAve );

router.put( '/aves/:idHistorial', [
    validarJWT,
    check( 'idHistorial', 'No es un id válido' ).isMongoId(),
    check( 'idHistorial' ).custom( existeHistoriaClinicaAve ),
    check( 'inspeccion', 'La inspección es obligatoria' ).escape().trim().notEmpty(),
    check( 'mucosa', 'El estado de la mucosa es obligatoria' ).escape().trim().notEmpty(),
    check( 'capilar', 'El llenado capilar es obligatorio' ).escape().trim().notEmpty(),
    check( 'linfonodos', 'La exploración de los linfónodos superficiales es obligatoria' ).escape().trim().notEmpty(),
    check( 'cardiaca', 'El pulso y frecuencia cardiaca son obligatorias' ).escape().trim().notEmpty(),
    check( 'respiratoria', 'Tipo y frecuencia respiratoria son sobligatorios' ).escape().trim().notEmpty(),
    check( 'pulmonares', 'Los campos pulmonares son obligatorios' ).escape().trim().notEmpty(),
    check( 'hidratacion', 'El estado de hidratación es obligatorio' ).escape().trim().notEmpty(),
    check( 'temperatura', 'La temperatura es obligatoria' ).escape().trim().notEmpty(),
    check( 'intestinales', 'Los sonidos intestinales son obligatorios' ).escape().trim().notEmpty(),
    check( 'heces', 'El estado de la hece es obligatoria' ).escape().trim().notEmpty(),
    check( 'aparatoRespiratorio', 'El aparato respiratorio es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoCardiovascular', 'El aparato cardiovascular es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenDermatologico', 'El examen dermatologico es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoDigestivo', 'El aparato digestivo es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoUrinario', 'El aparato urinario es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoReproductor', 'El aparato reproductor es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenOftalmologico', 'El examen oftamologico es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoLocomotor', 'El aparato locomotor es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenNeurologico', 'El examen neurológico es obligatorio' ).escape().trim().notEmpty(),
    check( 'tratamiento', 'El tratamiento es obligatorio' ).escape().trim().notEmpty(),
    check( 'pronostico', 'El pronóstico es obligatorio' ).escape().trim().notEmpty(),
    validarCampos
], actualizarHistoriaClinicaAve );

router.delete( '/aves/:idHistorial', [
    validarJWT,
    check( 'idHistorial', 'No es un id válido' ).isMongoId(),
    check( 'idHistorial' ).custom( existeHistoriaClinicaAve ),
    validarCampos
], eliminarHistoriaClinicaAve );

// **********************************************************
// - End points para las historias clínicas de los borregos -
// **********************************************************
// * * * * * * * * * B O R R E G O S * * * * * * * * * *

router.get( '/borregos', obtenerHistoriaClinicaBorregos );

router.get( '/borregos/:idBorrego', [
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    validarCampos
], obtenerHistoriaClinicaBorregoById );

router.post( '/borregos/:idBorrego', [
    validarJWT,
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    check( 'inspeccion', 'La inspección es obligatoria' ).escape().trim().notEmpty(),
    check( 'mucosa', 'El estado de la mucosa es obligatoria' ).escape().trim().notEmpty(),
    check( 'capilar', 'El llenado capilar es obligatorio' ).escape().trim().notEmpty(),
    check( 'linfonodos', 'La exploración de los linfónodos superficiales es obligatoria' ).escape().trim().notEmpty(),
    check( 'cardiaca', 'El pulso y frecuencia cardiaca son obligatorias' ).escape().trim().notEmpty(),
    check( 'respiratoria', 'Tipo y frecuencia respiratoria son sobligatorios' ).escape().trim().notEmpty(),
    check( 'pulmonares', 'Los campos pulmonares son obligatorios' ).escape().trim().notEmpty(),
    check( 'hidratacion', 'El estado de hidratación es obligatorio' ).escape().trim().notEmpty(),
    check( 'temperatura', 'La temperatura es obligatoria' ).escape().trim().notEmpty(),
    check( 'intestinales', 'Los sonidos intestinales son obligatorios' ).escape().trim().notEmpty(),
    check( 'heces', 'El estado de la hece es obligatoria' ).escape().trim().notEmpty(),
    check( 'aparatoRespiratorio', 'El aparato respiratorio es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoCardiovascular', 'El aparato cardiovascular es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenDermatologico', 'El examen dermatologico es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoDigestivo', 'El aparato digestivo es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoUrinario', 'El aparato urinario es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoReproductor', 'El aparato reproductor es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenOftalmologico', 'El examen oftamologico es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoLocomotor', 'El aparato locomotor es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenNeurologico', 'El examen neurológico es obligatorio' ).escape().trim().notEmpty(),
    check( 'tratamiento', 'El tratamiento es obligatorio' ).escape().trim().notEmpty(),
    check( 'pronostico', 'El pronóstico es obligatorio' ).escape().trim().notEmpty(),
    validarCampos
], registrarHistoriaClinicaBorrego );

router.put( '/borregos/:idHistorial', [
    validarJWT,
    check( 'idHistorial', 'No es un id válido' ).isMongoId(),
    check( 'idHistorial' ).custom( existeHistoriaClinicaBorrego ),
    validarCampos
], actualizarHistoriaClinicaBorrego );

router.delete( '/borregos/:idHistorial', [
    validarJWT,
    check( 'idHistorial', 'No es un id válido' ).isMongoId(),
    check( 'idHistorial' ).custom( existeHistoriaClinicaBorrego ),
    validarCampos
], eliminarHistoriaClinicaBorrego );

// **********************************************************
// - End points para las historias clínicas de los caballos -
// **********************************************************
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
    check( 'inspeccion', 'La inspección es obligatoria' ).escape().trim().notEmpty(),
    check( 'mucosa', 'El estado de la mucosa es obligatoria' ).escape().trim().notEmpty(),
    check( 'capilar', 'El llenado capilar es obligatorio' ).escape().trim().notEmpty(),
    check( 'linfonodos', 'La exploración de los linfónodos superficiales es obligatoria' ).escape().trim().notEmpty(),
    check( 'cardiaca', 'El pulso y frecuencia cardiaca son obligatorias' ).escape().trim().notEmpty(),
    check( 'respiratoria', 'Tipo y frecuencia respiratoria son sobligatorios' ).escape().trim().notEmpty(),
    check( 'pulmonares', 'Los campos pulmonares son obligatorios' ).escape().trim().notEmpty(),
    check( 'hidratacion', 'El estado de hidratación es obligatorio' ).escape().trim().notEmpty(),
    check( 'temperatura', 'La temperatura es obligatoria' ).escape().trim().notEmpty(),
    check( 'intestinales', 'Los sonidos intestinales son obligatorios' ).escape().trim().notEmpty(),
    check( 'heces', 'El estado de la hece es obligatoria' ).escape().trim().notEmpty(),
    check( 'aparatoRespiratorio', 'El aparato respiratorio es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoCardiovascular', 'El aparato cardiovascular es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenDermatologico', 'El examen dermatologico es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoDigestivo', 'El aparato digestivo es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoUrinario', 'El aparato urinario es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoReproductor', 'El aparato reproductor es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenOftalmologico', 'El examen oftamologico es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoLocomotor', 'El aparato locomotor es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenNeurologico', 'El examen neurológico es obligatorio' ).escape().trim().notEmpty(),
    check( 'tratamiento', 'El tratamiento es obligatorio' ).escape().trim().notEmpty(),
    check( 'pronostico', 'El pronóstico es obligatorio' ).escape().trim().notEmpty(),
    validarCampos
], registrarHistoriaClinicaCaballo );

router.put( '/caballos/:idHistorial', [
    validarJWT,
    check( 'idHistorial', 'No es un id válido' ).isMongoId(),
    check( 'idHistorial' ).custom( existeHistoriaClinicaCaballo ),
    check( 'inspeccion', 'La inspección es obligatoria' ).escape().trim().notEmpty(),
    check( 'mucosa', 'El estado de la mucosa es obligatoria' ).escape().trim().notEmpty(),
    check( 'capilar', 'El llenado capilar es obligatorio' ).escape().trim().notEmpty(),
    check( 'linfonodos', 'La exploración de los linfónodos superficiales es obligatoria' ).escape().trim().notEmpty(),
    check( 'cardiaca', 'El pulso y frecuencia cardiaca son obligatorias' ).escape().trim().notEmpty(),
    check( 'respiratoria', 'Tipo y frecuencia respiratoria son sobligatorios' ).escape().trim().notEmpty(),
    check( 'pulmonares', 'Los campos pulmonares son obligatorios' ).escape().trim().notEmpty(),
    check( 'hidratacion', 'El estado de hidratación es obligatorio' ).escape().trim().notEmpty(),
    check( 'temperatura', 'La temperatura es obligatoria' ).escape().trim().notEmpty(),
    check( 'intestinales', 'Los sonidos intestinales son obligatorios' ).escape().trim().notEmpty(),
    check( 'heces', 'El estado de la hece es obligatoria' ).escape().trim().notEmpty(),
    check( 'aparatoRespiratorio', 'El aparato respiratorio es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoCardiovascular', 'El aparato cardiovascular es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenDermatologico', 'El examen dermatologico es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoDigestivo', 'El aparato digestivo es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoUrinario', 'El aparato urinario es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoReproductor', 'El aparato reproductor es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenOftalmologico', 'El examen oftamologico es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoLocomotor', 'El aparato locomotor es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenNeurologico', 'El examen neurológico es obligatorio' ).escape().trim().notEmpty(),
    check( 'tratamiento', 'El tratamiento es obligatorio' ).escape().trim().notEmpty(),
    check( 'pronostico', 'El pronóstico es obligatorio' ).escape().trim().notEmpty(),
    validarCampos
], actualizarHistoriaClinicaCaballo );

router.delete( '/caballos/:idHistorial', [
    validarJWT,
    check( 'idHistorial', 'No es un id válido' ).isMongoId(),
    check( 'idHistorial' ).custom( existeHistoriaClinicaCaballo ),
    validarCampos
], eliminarHistoriaClinicaCaballo );

// **********************************************************
// - End points para las historias clínicas de los conejos -
// **********************************************************
// * * * * * * * * * C O N E J O S * * * * * * * * * *

router.get( '/conejos', obtenerHistoriaClinicaConejos );

router.get( '/conejos/:idConejo', [
    check( 'idConejo', 'No es un id válido' ).isMongoId(),
    check( 'idConejo' ).custom( existeConejo ),
    validarCampos
], obtenerHistoriaClinicaConejoById );

router.post( '/conejos/:idConejo', [
    validarJWT,
    check( 'idConejo', 'No es un id válido' ).isMongoId(),
    check( 'idConejo' ).custom( existeConejo ),
    check( 'inspeccion', 'La inspección es obligatoria' ).escape().trim().notEmpty(),
    check( 'mucosa', 'El estado de la mucosa es obligatoria' ).escape().trim().notEmpty(),
    check( 'capilar', 'El llenado capilar es obligatorio' ).escape().trim().notEmpty(),
    check( 'linfonodos', 'La exploración de los linfónodos superficiales es obligatoria' ).escape().trim().notEmpty(),
    check( 'cardiaca', 'El pulso y frecuencia cardiaca son obligatorias' ).escape().trim().notEmpty(),
    check( 'respiratoria', 'Tipo y frecuencia respiratoria son sobligatorios' ).escape().trim().notEmpty(),
    check( 'pulmonares', 'Los campos pulmonares son obligatorios' ).escape().trim().notEmpty(),
    check( 'hidratacion', 'El estado de hidratación es obligatorio' ).escape().trim().notEmpty(),
    check( 'temperatura', 'La temperatura es obligatoria' ).escape().trim().notEmpty(),
    check( 'intestinales', 'Los sonidos intestinales son obligatorios' ).escape().trim().notEmpty(),
    check( 'heces', 'El estado de la hece es obligatoria' ).escape().trim().notEmpty(),
    check( 'aparatoRespiratorio', 'El aparato respiratorio es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoCardiovascular', 'El aparato cardiovascular es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenDermatologico', 'El examen dermatologico es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoDigestivo', 'El aparato digestivo es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoUrinario', 'El aparato urinario es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoReproductor', 'El aparato reproductor es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenOftalmologico', 'El examen oftamologico es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoLocomotor', 'El aparato locomotor es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenNeurologico', 'El examen neurológico es obligatorio' ).escape().trim().notEmpty(),
    check( 'tratamiento', 'El tratamiento es obligatorio' ).escape().trim().notEmpty(),
    check( 'pronostico', 'El pronóstico es obligatorio' ).escape().trim().notEmpty(),
    validarCampos
], registrarHistoriaClinicaConejo );

router.put( '/conejos/:idHistorial', [
    validarJWT,
    check( 'idHistorial', 'No es un id válido' ).isMongoId(),
    check( 'idHistorial' ).custom( existeHistoriaClinicaConejo ),
    validarCampos
], actualizarHistoriaClinicaConejo );

// **********************************************************
// - End points para las historias clínicas de las mascotas -
// **********************************************************
// * * * * * * * * * M A S C O T A S * * * * * * * * * *

router.get( '/mascotas', obtenerHistoriaClinicaMascotas );

router.get( '/mascotas/:idMascota', [
    check( 'idMascota', 'No es un id válido' ).isMongoId(),
    check( 'idMascota' ).custom( existeMascota ),
    validarCampos
], obtenerHistoriaClinicaMascotaById );

router.post( '/mascotas/:idMascota', [
    validarJWT,
    check( 'idMascota', 'No es un id válido' ).isMongoId(),
    check( 'idMascota' ).custom( existeMascota ),
    check( 'inspeccion', 'La inspección es obligatoria' ).escape().trim().notEmpty(),
    check( 'mucosa', 'El estado de la mucosa es obligatoria' ).escape().trim().notEmpty(),
    check( 'capilar', 'El llenado capilar es obligatorio' ).escape().trim().notEmpty(),
    check( 'linfonodos', 'La exploración de los linfónodos superficiales es obligatoria' ).escape().trim().notEmpty(),
    check( 'cardiaca', 'El pulso y frecuencia cardiaca son obligatorias' ).escape().trim().notEmpty(),
    check( 'respiratoria', 'Tipo y frecuencia respiratoria son sobligatorios' ).escape().trim().notEmpty(),
    check( 'pulmonares', 'Los campos pulmonares son obligatorios' ).escape().trim().notEmpty(),
    check( 'hidratacion', 'El estado de hidratación es obligatorio' ).escape().trim().notEmpty(),
    check( 'temperatura', 'La temperatura es obligatoria' ).escape().trim().notEmpty(),
    check( 'intestinales', 'Los sonidos intestinales son obligatorios' ).escape().trim().notEmpty(),
    check( 'heces', 'El estado de la hece es obligatoria' ).escape().trim().notEmpty(),
    check( 'aparatoRespiratorio', 'El aparato respiratorio es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoCardiovascular', 'El aparato cardiovascular es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenDermatologico', 'El examen dermatologico es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoDigestivo', 'El aparato digestivo es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoUrinario', 'El aparato urinario es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoReproductor', 'El aparato reproductor es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenOftalmologico', 'El examen oftamologico es obligatorio' ).escape().trim().notEmpty(),
    check( 'aparatoLocomotor', 'El aparato locomotor es obligatorio' ).escape().trim().notEmpty(),
    check( 'examenNeurologico', 'El examen neurológico es obligatorio' ).escape().trim().notEmpty(),
    check( 'tratamiento', 'El tratamiento es obligatorio' ).escape().trim().notEmpty(),
    check( 'pronostico', 'El pronóstico es obligatorio' ).escape().trim().notEmpty(),
    validarCampos
], registrarHistoriaClinicaMascota );

router.put( '/mascotas/:idHistorial', [
    validarJWT,
    check( 'idHistorial', 'No es un id válido' ).isMongoId(),
    check( 'idHistorial' ).custom( existeHistoriaClinicaMascota ),
    validarCampos
], actualizarHistoriaClinicaMascota );

module.exports = router;