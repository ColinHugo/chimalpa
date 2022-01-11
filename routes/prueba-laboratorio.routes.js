const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeAve, existePruebaLaboratorioAve,
        existeBorrego, existePruebaLaboratorioBorrego,
        existeCaballo, existePruebaLaboratorioCaballo,
        existeMascota, existePruebaLaboratorioMascota } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerPruebasLaboratorioAves, obtenerPruebaLaboratorioAveById,
        registrarPruebaLaboratorioAve, actualizarPruebaLaboratorioAve } = require( '../controllers/prueba-laboratorio-ave.controller' );

const { obtenerPruebasLaboratorioBorregos, obtenerPruebaLaboratorioBorregoById,
        registrarPruebaLaboratorioBorrego, actualizarPruebaLaboratorioBorrego } = require( '../controllers/prueba-laboratorio-borrego.controller' );

const { obtenerPruebasLaboratoriosCaballos, obtenerPruebaLaboratorioCaballoById, 
        registrarPruebaLaboratorioCaballo, actualizarPruebaLaboratorioCaballo } = require( '../controllers/prueba-laboratorio.controller' );

const { obtenerPruebasLaboratorioMascotas, obtenerPruebaLaboratorioMascotaById,
        registrarPruebaLaboratorioMascota, actualizarPruebaLaboratorioMascota } = require( '../controllers/prueba-laboratorio-mascota.controller' );

// **************************************************************
// -   End points para las pruebas de laboratorio de las aves   -
// **************************************************************
// * * * * * * * * * A V E S * * * * * * * * * *

router.get( '/aves', obtenerPruebasLaboratorioAves );

router.get( '/aves/:idAve', [
    check( 'idAve', 'No es un id válido' ).isMongoId(),
    check( 'idAve' ).custom( existeAve ),
    validarCampos
], obtenerPruebaLaboratorioAveById );

router.post( '/aves/:idAve', [
    validarJWT,
    check( 'link', 'El link de la prueba de laboratorio es obligatorio' ).trim().notEmpty(),
    check( 'idAve' ).custom( existeAve ),
    validarCampos
], registrarPruebaLaboratorioAve );

router.put( '/aves/:idPruebaLaboratorio', [
    validarJWT,
    check( 'idPruebaLaboratorio', 'No es un id válido' ).isMongoId(),
    check( 'idPruebaLaboratorio' ).custom( existePruebaLaboratorioAve ),
    validarCampos
], actualizarPruebaLaboratorioAve );

// **************************************************************
// - End points para las pruebas de laboratorio de los borregos -
// **************************************************************
// * * * * * * * * * B O R R E G O S * * * * * * * * * *

router.get( '/borregos', obtenerPruebasLaboratorioBorregos );

router.get( '/borregos/:idBorrego', [
    check( 'idBorrego', 'No es un id válido' ).isMongoId(),
    check( 'idBorrego' ).custom( existeBorrego ),
    validarCampos
], obtenerPruebaLaboratorioBorregoById );

router.post( '/borregos/:idBorrego', [
    validarJWT,
    check( 'link', 'El link de la prueba de laboratorio es obligatorio' ).trim().notEmpty(),
    check( 'idBorrego' ).custom( existeBorrego ),
    validarCampos
], registrarPruebaLaboratorioBorrego );

router.put( '/borregos/:idPruebaLaboratorio', [
    validarJWT,
    check( 'idPruebaLaboratorio', 'No es un id válido' ).isMongoId(),
    check( 'idPruebaLaboratorio' ).custom( existePruebaLaboratorioBorrego ),
    validarCampos
], actualizarPruebaLaboratorioBorrego );

// **************************************************************
// - End points para las pruebas de laboratorio de los caballos -
// **************************************************************
// * * * * * * * * * * C A B A L L O S * * * * * * * * * *

router.get( '/caballos', obtenerPruebasLaboratoriosCaballos );

router.get( '/caballos/:idCaballo', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], obtenerPruebaLaboratorioCaballoById );

router.post( '/caballos/:idCaballo', [
    validarJWT,
    check( 'link', 'El link de la prueba de laboratorio es obligatorio' ).trim().notEmpty(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], registrarPruebaLaboratorioCaballo );

router.put( '/caballos/:idPruebaLaboratorio', [
    validarJWT,
    check( 'idPruebaLaboratorio', 'No es un id válido' ).isMongoId(),
    check( 'idPruebaLaboratorio' ).custom( existePruebaLaboratorioCaballo ),
    validarCampos
], actualizarPruebaLaboratorioCaballo );

// **************************************************************
// - End points para las pruebas de laboratorio de las mascotas -
// **************************************************************
// * * * * * * * * * * M A S C O T A S * * * * * * * * * *

router.get( '/mascotas', obtenerPruebasLaboratorioMascotas );

router.get( '/mascotas/:idMascota', [
    check( 'idMascota', 'No es un id válido' ).isMongoId(),
    check( 'idMascota' ).custom( existeMascota ),
    validarCampos
], obtenerPruebaLaboratorioMascotaById );

router.post( '/mascotas/:idMascota', [
    validarJWT,
    check( 'link', 'El link de la prueba de laboratorio es obligatorio' ).trim().notEmpty(),
    check( 'idMascota' ).custom( existeMascota ),
    validarCampos
], registrarPruebaLaboratorioMascota );

router.put( '/mascotas/:idPruebaLaboratorio', [
    validarJWT,
    check( 'idPruebaLaboratorio', 'No es un id válido' ).isMongoId(),
    check( 'idPruebaLaboratorio' ).custom( existePruebaLaboratorioMascota ),
    validarCampos
], actualizarPruebaLaboratorioMascota );

module.exports = router;