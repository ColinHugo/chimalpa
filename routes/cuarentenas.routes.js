const router = require( 'express' ).Router();

const { check } = require( 'express-validator' );

const { existeAve, existeCuarentenaAve } = require( '../helpers' );

const { validarCampos, validarJWT } = require( '../middlewares' );

const {
    obtenerCuarentenaAves,
    obtenerCuarentenaAveById,
    registrarCuarentenaAve,
    actualizarCuarentenaAve,
    eliminarCuarentenaAve
} = require( '../controllers/cuarentena-aves.controller' );

// ****************************************************
// -    End points para las cuarentenas de las aves    -
// ****************************************************
// * * * * * * * * * * A V E S * * * * * * * * * *

router.get( '/aves', obtenerCuarentenaAves );

router.get( '/aves/:idAve', [
    check( 'idAve', 'No es un id válido' ).isMongoId(),
    check( 'idAve' ).custom( existeAve ),
    validarCampos
], obtenerCuarentenaAveById );

router.post( '/aves/:idAve', [
    validarJWT,
    check( 'idAve', 'No es un id válido' ).isMongoId(),
    check( 'idAve' ).custom( existeAve ),
    check( 'fechaInicio', 'Ingrese una fecha de inicio de la cuarentena válida.' ).escape().trim().isDate(),
    check( 'fechaTermino', 'Ingrese una fecha de término de la cuarentena válida.' ).escape().trim().isDate(),
    check( 'instrucciones', 'Las instrucciones de la cuarentena es obligatoria.' ).escape().trim().notEmpty(),    
    validarCampos
], registrarCuarentenaAve );

router.put( '/aves/:idCuarentena', [
    validarJWT,
    check( 'idCuarentena', 'No es un id válido' ).isMongoId(),
    check( 'idCuarentena' ).custom( existeCuarentenaAve ),
    check( 'fechaInicio', 'Ingrese una fecha de inicio de la cuarentena válida.' ).escape().trim().isDate(),
    check( 'fechaTermino', 'Ingrese una fecha de término de la cuarentena válida.' ).escape().trim().isDate(),
    check( 'instrucciones', 'Las instrucciones de la cuarentena es obligatoria.' ).escape().trim().notEmpty(),   
    validarCampos
], actualizarCuarentenaAve );

router.delete( '/aves/:idCuarentena', [
    validarJWT,
    check( 'idCuarentena', 'No es un id válido' ).isMongoId(),
    check( 'idCuarentena' ).custom( existeCuarentenaAve ),
    validarCampos
], eliminarCuarentenaAve );

module.exports = router;