const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { existeCaballo, existeDestete } = require( '../helpers/db-validators' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const { obtenerDestetesCaballos, obtenerDesteteCaballoById,
        registrarDesteteCaballo, actualizarDesteteCaballo } = require( '../controllers/destetes.controller' );

// * * * * * * * * * * C A B A L L O S * * * * * * * * * *

router.get( '/caballos', obtenerDestetesCaballos );

router.get( '/caballos/:idCaballo', [
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    validarCampos
], obtenerDesteteCaballoById );

router.post( '/caballos/:idCaballo', [
    validarJWT,
    check( 'idCaballo', 'No es un id válido' ).isMongoId(),
    check( 'idCaballo' ).custom( existeCaballo ),
    check( 'fecha', 'La fecha es obligatoria' ).escape().trim().notEmpty(),
    check( 'instrucciones', 'Las instrucciones son obligatorias' ).escape().trim().notEmpty(),
    validarCampos
], registrarDesteteCaballo );

router.put( '/caballos/:idDestete', [
    validarJWT,
    check( 'idDestete', 'No es un id válido' ).isMongoId(),
    check( 'idDestete' ).custom( existeDestete ),
    validarCampos
], actualizarDesteteCaballo )

module.exports = router;