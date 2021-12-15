const { Caballo, Usuario, DietaCaballo, DietaYegua, TratamientoPermanente, 
        DesteteCaballo, MedicinaPreventiva, RecorteCasco } = require( '../models' );

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

const existeMedicinaPreventiva = async ( id ) => {

    const medicinaPreventiva = await MedicinaPreventiva.findById( id );

    if ( !medicinaPreventiva ) {
        throw new Error( `No existe medicina preventiva con el id: ${ id }.` );
    }
}

const existeRecorteCasco = async ( id ) => {

    const recorteCasco = await RecorteCasco.findById( id );

    if ( !recorteCasco ) {
        throw new Error( `No existe recorte de casco con el id: ${ id }.` );
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
    existeDestete,
    existeMedicinaPreventiva,
    existeRecorteCasco
}