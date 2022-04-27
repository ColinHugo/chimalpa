const { Usuario }  = require( '../models' );

const { generarJWT, generarUrlFotos }  = require( '../helpers' );

const iniciarSesion = async ( req, res ) => {

    const { correo, password } = req.body;

    try {

        let usuario = await Usuario.findOne( { correo } );
    
        const passwordCorrect = ( usuario === null || !usuario.estado ) ? 
        false : await usuario.comparePassword( password );
    
        if ( !passwordCorrect ) {
            return res.json( {
                value: 0,
                msg: 'Usuario o Password incorrectos',
            } );
        }
    
        const token = await generarJWT( usuario.id );

        usuario = generarUrlFotos( req, 'usuarios', usuario );
    
        return res.json( {
            value: 1,
            usuario,
            token
        } );

    } catch ( error ) {

        console.error( 'Error al inicar sesión', error );

        return res.json( {
            value: 0,
            msg: 'Error al inicar sesión',
        } );
    }
}

module.exports = {
    iniciarSesion
}