const { Caballo, Usuario, DietaCaballo, DietaYegua, TratamientoPermanente, 
        DesteteCaballo } = require( '../models' );

const existeCaballo = async ( idCaballo ) => {

    const existeCaballo = await Caballo.findById( idCaballo );

    if ( !existeCaballo ) {
        throw new Error( `No existe caballo con el id: ${ idCaballo }.` );
    }
}

const existeDietaCaballo = async ( id ) => {

    const dieta = await DietaCaballo.findById( id );

    if ( !dieta ) {
        throw new Error( `No existe dieta con el id: ${ id }` );
    }
}

const existeDietaYegua = async ( id ) => {

    const dieta = await DietaYegua.findById( id );

    if ( !dieta ) {
        throw new Error( `No existe dieta con el id: ${ id }` );
    }
}

const existeTratamiento = async ( id ) => {

    const tratamiento = await TratamientoPermanente.findById( id );

    if ( !tratamiento ) {
        throw new Error( `No existe tratamiento con el id: ${ id }.` );
    }
}

const existeDestete = async ( id ) => {

    const destete = await DesteteCaballo.findById( id );

    if ( !destete ) {
        throw new Error( `No existe destete con el id: ${ id }.` );
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
    emailExiste,

    // Dietas
    existeDietaCaballo,
    existeDietaYegua,

    existeTratamiento,
    existeDestete
}