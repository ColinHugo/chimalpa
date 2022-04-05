const dbValidators = require( './db-validators' );
const generarControl = require( './generar-control' );
const generarJWT = require( './generar-jwt' );
const generarUrlFotos  = require( './generar-url-fotos' );
const subirArchivo = require( './subir-archivo' );

module.exports = {
    ...dbValidators,
    ...generarControl,
    ...generarJWT,
    ...generarUrlFotos,
    ...subirArchivo
}