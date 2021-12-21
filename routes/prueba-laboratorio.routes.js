const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeCaballo, existePruebaLaboratorioCaballo } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerPruebasLaboratoriosCaballos, obtenerPruebaLaboratorioCaballoById, 
        registrarPruebaLaboratorioCaballo, 
        actualizarPruebaLaboratorioCaballo } = require( '../controllers/prueba-laboratorio.controller' );

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