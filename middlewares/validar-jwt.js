const jwt = require( 'jsonwebtoken' );

const { Usuario } = require( '../models' );

const validarJWT = async ( req, res, next ) => {

    const token = req.header( 'x-token' );

    if( !token ){
        return res.json( {
            value: 0,
            msg: 'No hay token en la petición',
        } );
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const usuario = await Usuario.findById( uid );

        if( !usuario || !usuario.estado ){
            return res.json( {
                value: 0,
                msg: 'Token no válido',
            } );
        }

        req.body.usuario = usuario;

        next();

    } catch ( error ) {

        console.error( 'Error al validar el token', error );

        return res.json( {
            value: 0,
            msg: 'Token no válido'
        } );
    }
}

module.exports = {
    validarJWT
}