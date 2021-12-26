const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeBorrego, existePruebaLaboratorioBorrego,
        existeCaballo, existePruebaLaboratorioCaballo } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerPruebasLaboratorioBorregos, obtenerPruebaLaboratorioBorregoById,
        registrarPruebaLaboratorioBorrego, actualizarPruebaLaboratorioBorrego } = require( '../controllers/prueba-laboratorio-borrego.controller' );

const { obtenerPruebasLaboratoriosCaballos, obtenerPruebaLaboratorioCaballoById, 
        registrarPruebaLaboratorioCaballo, actualizarPruebaLaboratorioCaballo } = require( '../controllers/prueba-laboratorio.controller' );

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
    check( 'link', 'El link de la prueba de laboratorio es obligatorio' ).escape().trim().notEmpty(),
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
    check( 'link', 'El link de la prueba de laboratorio es obligatorio' ).escape().trim().notEmpty(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], registrarPruebaLaboratorioCaballo );

router.put( '/caballos/:idPruebaLaboratorio', [
    validarJWT,
    check( 'idPruebaLaboratorio', 'No es un id válido' ).isMongoId(),
    check( 'idPruebaLaboratorio' ).custom( existePruebaLaboratorioCaballo ),
    validarCampos
], actualizarPruebaLaboratorioCaballo );

module.exports = router;