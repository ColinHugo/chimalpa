const jwt = require( 'jsonwebtoken' );

const { Usuario } = require( '../models' );

const validarJWT = async ( req, res, next ) => {

    const token = req.header( 'x-token' );

    if( !token ){
        return res.json( {
            msg: 'No hay token en la petición',
        } );
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const usuario = await Usuario.findById( uid );

        if( !usuario ){
            return res.status( 401 ).json( {
                msg: 'Token no válido - usuario no existe en la bd',
            } );
        }
        
        if ( !usuario.estado ){
            return res.json( {
                msg: 'Token no válido - usuario con estado false',
            } );
        }

        req.usuario = usuario;

        next();

    } catch ( error ) {

        console.error( error );

        res.json( {
            msg: 'Token no válido'
        } );
    }
}

module.exports = {
    validarJWT
}