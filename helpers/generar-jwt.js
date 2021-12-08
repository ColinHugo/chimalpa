const jwt = require( 'jsonwebtoken' );

const generarJWT = ( uid = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, ( err, token ) => {

            if( err ){
                console.error( err );
                reject( 'No se pudo generar el JWT' );
            }

            else{
                resolve( token );
            }
        } );
    } );
}

module.exports = {
    generarJWT,
}