const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeAve, existeHistoriaClinicaAve,
        existeBorrego, existeHistoriaClinicaBorrego,
        existeCaballo, existeHistoriaClinicaCaballo,
        existeConejo, existeHistoriaClinicaConejo } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerHistoriaClinicaAves, obtenerHistoriaClinicaAveById,
        registrarHistoriaClinicaAve, actualizarHistoriaClinicaAve } = require( '../controllers/historia-clinica-aves.controller' );

const { obtenerHistoriaClinicaBorregos, obtenerHistoriaClinicaBorregoById,
        registrarHistoriaClinicaBorrego, actualizarHistoriaClinicaBorrego } = require( '../controllers/historia-clinica-borregos.controller' );

const { obtenerHistoriaClinicaCaballos, obtenerHistoriaClinicaCaballoById,
        registrarHistoriaClinicaCaballo, actualizarHistoriaClinicaCaballo } = require( '../controllers/historia-clinica.controller' );

const { obtenerHistoriaClinicaConejos, obtenerHistoriaClinicaConejoById,
        registrarHistoriaClinicaConejo, actualizarHistoriaClinicaConejo } = require( '../controllers/historia-clinica-conejos.controller' );

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
], registrarHistoriaClinicaAve );

router.put( '/aves/:idHistorial', [
    validarJWT,
    check( 'idHistorial', 'No es un id válido' ).isMongoId(),
    check( 'idHistorial' ).custom( existeHistoriaClinicaAve ),
    validarCampos
], actualizarHistoriaClinicaAve );

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
], registrarHistoriaClinicaBorrego );

router.put( '/borregos/:idHistorial', [
    validarJWT,
    check( 'idHistorial', 'No es un id válido' ).isMongoId(),
    check( 'idHistorial' ).custom( existeHistoriaClinicaBorrego ),
    validarCampos
], actualizarHistoriaClinicaBorrego );

// **********************************************************
// - End points para las historias clínicas de los caballos -
// **********************************************************
// * * * * * * * * * * C A B A L L O S * * * * * * * * * *

router.get( '/borregos', obtenerHistoriaClinicaCaballos );

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
], actualizarHistoriaClinicaCaballo );

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
], registrarHistoriaClinicaConejo );

router.put( '/conejos/:idHistorial', [
    validarJWT,
    check( 'idHistorial', 'No es un id válido' ).isMongoId(),
    check( 'idHistorial' ).custom( existeHistoriaClinicaConejo ),
    validarCampos
], actualizarHistoriaClinicaConejo );

module.exports = router;