const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const {
    existeAve,
    existePruebaLaboratorioAve,
    existeBorrego,
    existePruebaLaboratorioBorrego,
    existeConejo,
    existePruebaLaboratorioConejo,
    existeCaballo,
    existePruebaLaboratorioCaballo,
    existeMascota,
    existePruebaLaboratorioMascota
} = require( '../helpers' );

const { validarCampos, validarJWT } = require( '../middlewares' );

const {
    obtenerPruebasLaboratorioAves,
    obtenerPruebaLaboratorioAveById,
    registrarPruebaLaboratorioAve,
    actualizarPruebaLaboratorioAve,
    eliminarPruebaLaboratorioAve
} = require( '../controllers/prueba-laboratorio-ave.controller' );

const {
    obtenerPruebasLaboratorioBorregos,
    obtenerPruebaLaboratorioBorregoById,
    registrarPruebaLaboratorioBorrego,
    actualizarPruebaLaboratorioBorrego,
    eliminarPruebaLaboratorioBorrego
} = require( '../controllers/prueba-laboratorio-borrego.controller' );

const {
    obtenerPruebasLaboratorioConejos,
    obtenerPruebaLaboratorioConejoById,
    registrarPruebaLaboratorioConejo,
    actualizarPruebaLaboratorioConejo,
    eliminarPruebaLaboratorioConejo
} = require( '../controllers/prueba-laboratorio-conejo.controller' );

const {
    obtenerPruebasLaboratoriosCaballos,
    obtenerPruebaLaboratorioCaballoById,
    registrarPruebaLaboratorioCaballo,
    actualizarPruebaLaboratorioCaballo,
    eliminarPruebaLaboratorioCaballo
} = require( '../controllers/prueba-laboratorio.controller' );

const {
    obtenerPruebasLaboratorioMascotas,
    obtenerPruebaLaboratorioMascotaById,
    registrarPruebaLaboratorioMascota,
    actualizarPruebaLaboratorioMascota,
    eliminarPruebaLaboratorioMascota,
} = require( '../controllers/prueba-laboratorio-mascota.controller' );

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
    check( 'link', 'El link de la prueba de laboratorio es obligatorio' ).trim().isURL(),
    check( 'idAve' ).custom( existeAve ),
    validarCampos
], registrarPruebaLaboratorioAve );

router.put( '/aves/:idPruebaLaboratorio', [
    validarJWT,
    check( 'idPruebaLaboratorio', 'No es un id válido' ).isMongoId(),
    check( 'idPruebaLaboratorio' ).custom( existePruebaLaboratorioAve ),
    check( 'link', 'El link de la prueba de laboratorio es obligatorio' ).trim().isURL(),
    validarCampos
], actualizarPruebaLaboratorioAve );

router.delete( '/aves/:idPruebaLaboratorio', [
    validarJWT,
    check( 'idPruebaLaboratorio', 'No es un id válido' ).isMongoId(),
    check( 'idPruebaLaboratorio' ).custom( existePruebaLaboratorioAve ),
    validarCampos
], eliminarPruebaLaboratorioAve );

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
    check( 'link', 'Ingrese una URL válida.' ).trim().isURL(),
    check( 'idBorrego' ).custom( existeBorrego ),
    validarCampos
], registrarPruebaLaboratorioBorrego );

router.put( '/borregos/:idPruebaLaboratorio', [
    validarJWT,
    check( 'idPruebaLaboratorio', 'No es un id válido' ).isMongoId(),
    check( 'idPruebaLaboratorio' ).custom( existePruebaLaboratorioBorrego ),
    check( 'link', 'Ingrese una URL válida.' ).trim().isURL(),
    validarCampos
], actualizarPruebaLaboratorioBorrego );

router.delete( '/borregos/:idPruebaLaboratorio', [
    validarJWT,
    check( 'idPruebaLaboratorio', 'No es un id válido' ).isMongoId(),
    check( 'idPruebaLaboratorio' ).custom( existePruebaLaboratorioBorrego ),
    validarCampos
], eliminarPruebaLaboratorioBorrego );

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
    check( 'link', 'El link de la prueba de laboratorio es obligatorio' ).trim().notEmpty(),
    validarCampos
], actualizarPruebaLaboratorioCaballo );

router.delete( '/caballos/:idPruebaLaboratorio', [
    validarJWT,
    check( 'idPruebaLaboratorio', 'No es un id válido' ).isMongoId(),
    check( 'idPruebaLaboratorio' ).custom( existePruebaLaboratorioCaballo ),
    validarCampos
], eliminarPruebaLaboratorioCaballo );

// **************************************************************
// - End points para las pruebas de laboratorio de los conejos -
// **************************************************************
// * * * * * * * * * * * * C O N E J O S * * * * * * * * * * * * *

router.get( '/conejos', obtenerPruebasLaboratorioConejos );

router.get( '/conejos/:idConejo', [
    check( 'idConejo', 'No es un id válido' ).isMongoId(),
    check( 'idConejo' ).custom( existeConejo ),
    validarCampos
], obtenerPruebaLaboratorioConejoById );

router.post( '/conejos/:idConejo', [
    validarJWT,
    check( 'link', 'Ingrese una URL válida.' ).trim().isURL(),
    check( 'idConejo' ).custom( existeConejo ),
    validarCampos
], registrarPruebaLaboratorioConejo );

router.put( '/conejos/:idPruebaLaboratorio', [
    validarJWT,
    check( 'idPruebaLaboratorio', 'No es un id válido' ).isMongoId(),
    check( 'idPruebaLaboratorio' ).custom( existePruebaLaboratorioConejo ),
    check( 'link', 'Ingrese una URL válida.' ).trim().isURL(),
    validarCampos
], actualizarPruebaLaboratorioConejo );

router.delete( '/conejos/:idPruebaLaboratorio', [
    validarJWT,
    check( 'idPruebaLaboratorio', 'No es un id válido' ).isMongoId(),
    check( 'idPruebaLaboratorio' ).custom( existePruebaLaboratorioConejo ),
    validarCampos
], eliminarPruebaLaboratorioConejo );

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
    check( 'idMascota', 'No es un id válido' ).isMongoId(),
    check( 'idMascota' ).custom( existeMascota ),
    check( 'link', 'Ingrese una dirección váñida' ).trim().isURL(),
    validarCampos
], registrarPruebaLaboratorioMascota );

router.put( '/mascotas/:idPruebaLaboratorio', [
    validarJWT,
    check( 'idPruebaLaboratorio', 'No es un id válido' ).isMongoId(),
    check( 'idPruebaLaboratorio' ).custom( existePruebaLaboratorioMascota ),
    check( 'link', 'Ingrese una dirección váñida' ).trim().isURL(),
    validarCampos
], actualizarPruebaLaboratorioMascota );

router.delete( '/mascotas/:idPruebaLaboratorio', [
    validarJWT,
    check( 'idPruebaLaboratorio', 'No es un id válido' ).isMongoId(),
    check( 'idPruebaLaboratorio' ).custom( existePruebaLaboratorioMascota ),
    validarCampos
], eliminarPruebaLaboratorioMascota );

module.exports = router;