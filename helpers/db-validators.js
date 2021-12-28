const { Borrego, TratamientoPermanenteBorrego, TrasquilacionBorrego, RecortePesunaBorrego,
        HistorialReproductivoBorrego, PruebaLaboratorioBorrego,

        Caballo, Usuario, DietaCaballo, DietaYegua, TratamientoPermanente, 
        DesteteCaballo, MedicinaPreventiva, RecorteCasco, Odontologia, HistoriaClinica, 
        HistorialReproductivo, PruebasLaboratorio, DietaBorrego, MedicinaBorrego, HistoriaClinicaBorrego,

        Conejo, DietaConejo, MedicinaConejo, HistoriaClinicaConejo, HistorialReproductivoConejo,
    
    } = require( '../models' );

// Estos métodos se encargan de checar las existencias de los caballos y sus movimientos

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

const existeOdontologia = async ( id ) => {

    const odontologia = await Odontologia.findById( id );

    if ( !odontologia ) {
        throw new Error( `No existe registro odontológico con el id: ${ id }` )
    }
}

const existeHistoriaClinicaCaballo = async ( id ) => {

    const historiaCaballo = await HistoriaClinica.findById( id );

    if ( !historiaCaballo ) {
        throw new Error( `No existe registro de historial clínico de caballo con el id: ${ id }` )
    }
}

const existeHistorialReproductivoCaballo = async ( id ) => {

    const historialReproductivoCaballo = await HistorialReproductivo.findById( id );

    if ( !historialReproductivoCaballo ) {
        throw new Error( `No existe registro de historial reproductivo de caballo con el id: ${ id }` )
    }
}

const existePruebaLaboratorioCaballo = async ( id ) => {

    const pruebaLaboratorioCaballo = await PruebasLaboratorio.findById( id );

    if ( !pruebaLaboratorioCaballo ) {
        throw new Error( `No existe registro de la prueba de laboratorio con el id: ${ id }` )
    }
}

// Estos métodos se encargan de checar las existencias de los borregos y sus movimientos
// ****************************************************
// -                B O R R E G O S                   -
// ****************************************************

const existeBorrego = async ( idBorrego ) => {

    const existeBorrego = await Borrego.findById( idBorrego );

    if ( !existeBorrego || !existeBorrego.estado ) {
        throw new Error( `No existe borrego con el id: ${ idBorrego }.` );
    }
}

const existeTratamientoBorrego = async ( id ) => {

    const tratamiento = await TratamientoPermanenteBorrego.findById( id );

    if ( !tratamiento ) {
        throw new Error( `No existe tratamiento con el id: ${ id }.` );
    }
}

const existeDietaBorrego = async ( id ) => {

    const dieta = await DietaBorrego.findById( id );

    if ( !dieta ) {
        throw new Error( `No existe dieta con el id: ${ id }` );
    }
}

const existeTrasquilacionBorrego = async ( id ) => {

    const trasquilacion = await TrasquilacionBorrego.findById( id );

    if ( !trasquilacion ) {
        throw new Error( `No existe trasquilacion con el id: ${ id }.` );
    }
}

const existeRecortePesunaBorrego = async ( id ) => {

    const recortePesuna = await RecortePesunaBorrego.findById( id );

    if ( !recortePesuna ) {
        throw new Error( `No existe recorte de pesuña con el id: ${ id }.` );
    }
}

const existeMedicinaBorrego = async ( id ) => {

    const medicinaPreventiva = await MedicinaBorrego.findById( id );

    if ( !medicinaPreventiva ) {
        throw new Error( `No existe medicina preventiva con el id: ${ id }.` );
    }
}

const existeHistoriaClinicaBorrego = async ( id ) => {

    const historiaBorrego = await HistoriaClinicaBorrego.findById( id );

    if ( !historiaBorrego ) {
        throw new Error( `No existe registro de historial clínico de borrego con el id: ${ id }` )
    }
}

const existeHistorialReproductivoBorrego = async ( id ) => {

    const historialReproductivoBorrego = await HistorialReproductivoBorrego.findById( id );

    if ( !historialReproductivoBorrego ) {
        throw new Error( `No existe registro de historial reproductivo de borrego con el id: ${ id }` )
    }
}

const existePruebaLaboratorioBorrego = async ( id ) => {

    const pruebaLaboratorioBorrego = await PruebaLaboratorioBorrego.findById( id );

    if ( !pruebaLaboratorioBorrego ) {
        throw new Error( `No existe registro de la prueba de laboratorio de borrego con el id: ${ id }` )
    }
}

// Estos métodos se encargan de checar las existencias de los conejo y sus movimientos
// ****************************************************
// -                 C O N E J O S                    -
// ****************************************************

const existeConejo = async ( id ) => {

    const existeConejo = await Conejo.findById( id );

    if ( !existeConejo || !existeConejo.estado ) {
        throw new Error( `No existe conejo con el id: ${ id }.` );
    }
}

const existeDietaConejo = async ( id ) => {

    const dieta = await DietaConejo.findById( id );

    if ( !dieta ) {
        throw new Error( `No existe dieta con el id: ${ id }` );
    }
}

const existeMedicinaConejo = async ( id ) => {

    const medicinaPreventiva = await MedicinaConejo.findById( id );

    if ( !medicinaPreventiva ) {
        throw new Error( `No existe medicina preventiva con el id: ${ id }.` );
    }
}

const existeHistoriaClinicaConejo = async ( id ) => {

    const historiaConejo = await HistoriaClinicaConejo.findById( id );

    if ( !historiaConejo ) {
        throw new Error( `No existe registro de historial clínico de conejo con el id: ${ id }` )
    }
}

const existeHistorialReproductivoConejo = async ( id ) => {

    const historialReproductivoConejo = await HistorialReproductivoConejo.findById( id );

    if ( !historialReproductivoConejo ) {
        throw new Error( `No existe registro de historial reproductivo de conejo con el id: ${ id }` )
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

    // Validadores para borregos
    existeBorrego,
    existeTratamientoBorrego,
    existeDietaBorrego,
    existeTrasquilacionBorrego,
    existeRecortePesunaBorrego,
    existeMedicinaBorrego,
    existeHistoriaClinicaBorrego,
    existeHistorialReproductivoBorrego,
    existePruebaLaboratorioBorrego,

    // Validadores para caballos
    existeCaballo,
    existeDestete,
    existeDietaCaballo,
    existeDietaYegua,
    existeHistoriaClinicaCaballo,
    existeHistorialReproductivoCaballo,
    existeMedicinaPreventiva,
    existeOdontologia,
    existePruebaLaboratorioCaballo,
    existeRecorteCasco,
    existeTratamiento,

    // vALIDADORES PARA CONEJOS
    existeConejo,
    existeDietaConejo,
    existeMedicinaConejo,
    existeHistoriaClinicaConejo,
    existeHistorialReproductivoConejo,

    existeUsuario,
    emailExiste,
}