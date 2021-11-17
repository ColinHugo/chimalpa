const { Caballo, Usuario } = require( '../models' );

const existeCaballo = async ( id ) => {

    const existeCaballo = await Caballo.findById( id );

    if ( !existeCaballo ) {
        throw new Error( `No existe caballo con el id: ${ id }.` );
    }
}

const existeUsuario = async ( id ) => {

    const existeUsuario = await Usuario.findById( id );

    if ( !existeUsuario ) {
        throw new Error( `No existe usuario con el id: ${ id }.` );
    }
}

const emailExiste = async( correo = '' ) => {
    
    const existeEmail = await Usuario.findOne( { correo } );
    
    if ( existeEmail ) {
        throw new Error( `El correo: ${ correo }, ya está registrado` );
    }
}

module.exports = {
    existeCaballo,
    existeUsuario,
    emailExiste
}