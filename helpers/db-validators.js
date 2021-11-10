const { Caballo } = require( '../models' );

const existeCaballo = async ( id ) => {

    const existeCaballo = await Caballo.findById( id );

    if ( !existeCaballo ) {
        throw new Error( `No existe caballo con el id: ${ id }.` );
    }
}

module.exports = {
    existeCaballo
}