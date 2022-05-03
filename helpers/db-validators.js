const { Ave, HistoriaClinicaAve, MedicinaAve, DietaAve, CuarentenaAve, HistorialReproductivoAve,
        PruebaLaboratorioAve,

        Borrego, TratamientoPermanenteBorrego, TrasquilacionBorrego, RecortePesunaBorrego,
        HistorialReproductivoBorrego, PruebaLaboratorioBorrego, DietaBorrego, MedicinaBorrego, 
        HistoriaClinicaBorrego,

        Caballo, DesteteCaballo, DietaCaballo, DietaYegua, HistoriaClinica, HistorialReproductivoCaballo,
        MedicinaPreventiva, Odontologia, PruebasLaboratorio, MontaCaballo,
        RecorteCasco, RondinCaballo, TratamientoEventualCaballo, TratamientoPermanente,
        UltraSonidoCaballo,

        Conejo, DietaConejo, MedicinaConejo, HistoriaClinicaConejo, HistorialReproductivoConejo,
        PruebaLaboratorioConejo,

        Mascota, TratamientoPermanenteMascota, DietaMascota, MedicinaMascota, HistoriaClinicaMascota,
        HistorialReproductivoMascota, PruebaLaboratorioMascota,

        Alerta,
        Herramienta,
        Capacitacion,
        Tarea,
        Usuario,
    
} = require( '../models' );

// Estos métodos se encargan de checar las existencias de las alertas y sus movimientos
// ****************************************************
// -                 A L E R T A S                    -
// ****************************************************

const existeAlerta = async ( id ) => {

    const alerta = await Alerta.findById( id );

    if ( !alerta ) {
        throw new Error( `No existe la alerta con el id: ${ id }.` );
    }
}

// Estos métodos se encargan de checar las existencias de las aves y sus movimientos
// ****************************************************
// -                    A V E S                       -
// ****************************************************

const existeAve = async ( id ) => {

    const existeAve = await Ave.findById( id );

    if ( !existeAve || !existeAve.estado ) {
        throw new Error( `No existe ave con el id: ${ id }.` );
    }
}

const existeHistoriaClinicaAve = async ( id ) => {

    const historiaAve = await HistoriaClinicaAve.findById( id );

    if ( !historiaAve ) {
        throw new Error( `No existe registro de historial clínico de ave con el id: ${ id }` )
    }
}

const existeMedicinaAve = async ( id ) => {

    const medicinaPreventivaAve = await MedicinaAve.findById( id );

    if ( !medicinaPreventivaAve ) {
        throw new Error( `No existe medicina preventiva para el ave con el id: ${ id }.` );
    }
}

const existeDietaAve = async ( id ) => {

    const dieta = await DietaAve.findById( id );

    if ( !dieta ) {
        throw new Error( `No existe dieta para el ave con el id: ${ id }` );
    }
}

const existeCuarentenaAve = async ( id ) => {

    const cuarentena = await CuarentenaAve.findById( id );

    if ( !cuarentena ) {
        throw new Error( `No existe cuarentena para el ave con el id: ${ id }` );
    }
}

const existeHistorialReproductivoAve = async ( id ) => {

    const historialReproductivoAve = await HistorialReproductivoAve.findById( id );

    if ( !historialReproductivoAve ) {
        throw new Error( `No existe registro de historial reproductivo de ave con el id: ${ id }` )
    }
}

const existePruebaLaboratorioAve = async ( id ) => {

    const pruebaLaboratorioAve = await PruebaLaboratorioAve.findById( id );

    if ( !pruebaLaboratorioAve ) {
        throw new Error( `No existe registro de la prueba de laboratorio de ave con el id: ${ id }` )
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

// Estos métodos se encargan de checar las existencias de los caballos y sus movimientos
// ****************************************************
// -                C A B A L L O S                   -
// ****************************************************

const existeCaballo = async ( idCaballo ) => {

    const existeCaballo = await Caballo.findById( idCaballo );

    if ( !existeCaballo || !existeCaballo.estado) {
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

const existeTratamientoEventual = async ( id ) => {

    const tratamiento = await TratamientoEventualCaballo.findById( id );

    if ( !tratamiento ) {
        throw new Error( `No existe tratamiento eventual con el id: ${ id }.` );
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

const existeMonta = async ( id ) => {

    const monta = await MontaCaballo.findById( id );

    if ( !monta ) {
        throw new Error( `No existe monta con el id: ${ id }.` );
    }
}

const existeUltrasonido = async ( id ) => {

    const ultraSonido = await UltraSonidoCaballo.findById( id );

    if ( !ultraSonido ) {
        throw new Error( `No existe ultraSonido con el id: ${ id }.` );
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

    const historialReproductivoCaballo = await HistorialReproductivoCaballo.findById( id );

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

const existeRondinCaballo = async ( id ) => {

    const rondinCaballo = await RondinCaballo.findById( id );

    if ( !rondinCaballo ) {
        throw new Error( `No existe rondín para el caballo con el id: ${ id }` )
    }
}

// Estos métodos se encargan de checar las existencias de los conejos y sus movimientos
// ****************************************************
// -                 C O N E J O S                    -
// ****************************************************

const existePruebaLaboratorioConejo = async ( id ) => {

    const pruebaLaboratorioConejo = await PruebaLaboratorioConejo.findById( id );

    if ( !pruebaLaboratorioConejo ) {
        throw new Error( `No existe registro de la prueba de laboratorio de conejo con el id: ${ id }` )
    }
}

// Estos métodos se encargan de checar las existencias de las capacitaciones y sus movimientos
// ****************************************************
// -          C A P A C I T A C I O N E S             -
// ****************************************************

const existeCapacitacion = async ( id ) => {

    const capacitacion = await Capacitacion.findById( id );

    if ( !capacitacion ) {
        throw new Error( `No existe capacitación con el id: ${ id }.` );
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

// Estos métodos se encargan de checar las existencias de las herramientas y sus movimientos
// ****************************************************
// -            H E R R A M I E N T A S               -
// ****************************************************

const existeHerramienta = async ( id ) => {

    const existeHerramienta = await Herramienta.findById( id );

    if ( !existeHerramienta ) {
        throw new Error( `No existe herramienta con el id: ${ id }.` );
    }
}

const existeUsuario = async ( id ) => {

    const existeUsuario = await Usuario.findById( id );

    if ( !existeUsuario ) {
        throw new Error( `No existe usuario con el id: ${ id }.` );
    }
}

const existeTarea = async ( id ) => {

    const tarea = await Tarea.findById( id );

    if ( !tarea ) {
        throw new Error( `No existe tarea con el id: ${ id }.` );
    }
}

const emailExiste = async( correo = '' ) => {
    
    const existeEmail = await Usuario.findOne( { correo } );
    
    if ( existeEmail ) {
        throw new Error( `El correo: ${ correo }, ya está registrado` );
    }
}

// Estos métodos se encargan de checar las existencias de los perros y gatos y sus movimientos
// ****************************************************
// -                M A S C O T A S                   -
// ****************************************************

const existeMascota = async ( id ) => {

    const existeMascota = await Mascota.findById( id );

    if ( !existeMascota || !existeMascota.estado ) {
        throw new Error( `No existe mascota con el id: ${ id }.` );
    }
}

const existeTratamientoMascota = async ( id ) => {

    const tratamiento = await TratamientoPermanenteMascota.findById( id );

    if ( !tratamiento ) {
        throw new Error( `No existe tratamiento con el id: ${ id }.` );
    }
}

const existeDietaMascota = async ( id ) => {

    const dieta = await DietaMascota.findById( id );

    if ( !dieta ) {
        throw new Error( `No existe dieta para la mascota con el id: ${ id }` );
    }
}

const existeMedicinaMascota = async ( id ) => {

    const medicinaPreventiva = await MedicinaMascota.findById( id );

    if ( !medicinaPreventiva ) {
        throw new Error( `No existe medicina preventiva para la masota con el id: ${ id }.` );
    }
}

const existeHistoriaClinicaMascota = async ( id ) => {

    const historiaMascota = await HistoriaClinicaMascota.findById( id );

    if ( !historiaMascota ) {
        throw new Error( `No existe registro de historial clínico de la mascota con el id: ${ id }` )
    }
}

const existeHistorialReproductivoMascota = async ( id ) => {

    const historialReproductivoMascota = await HistorialReproductivoMascota.findById( id );

    if ( !historialReproductivoMascota ) {
        throw new Error( `No existe registro de historial reproductivo de la mascota con el id: ${ id }` )
    }
}

const existePruebaLaboratorioMascota = async ( id ) => {

    const pruebaLaboratorioMascota = await PruebaLaboratorioMascota.findById( id );

    if ( !pruebaLaboratorioMascota ) {
        throw new Error( `No existe registro de la prueba de laboratorio para mascota con el id: ${ id }` )
    }
}

module.exports = {

    // Validadores para las alertas
    existeAlerta,

    // Validadores para las aves
    existeAve,
    existeHistoriaClinicaAve,
    existeMedicinaAve,
    existeDietaAve,
    existeCuarentenaAve,
    existeHistorialReproductivoAve,
    existePruebaLaboratorioAve,

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
    existeMonta,
    existeOdontologia,
    existePruebaLaboratorioCaballo,
    existeTratamientoEventual,
    existeRecorteCasco,
    existeRondinCaballo,
    existeTratamiento,
    existeUltrasonido,

    // vALIDADORES PARA CONEJOS
    existeConejo,
    existeDietaConejo,
    existeMedicinaConejo,
    existeHistoriaClinicaConejo,
    existeHistorialReproductivoConejo,
    existePruebaLaboratorioConejo,

    // VALIDACIONES PARA MASCOTAS
    existeMascota,
    existeTratamientoMascota,
    existeDietaMascota,
    existeMedicinaMascota,
    existeHistoriaClinicaMascota,
    existeHistorialReproductivoMascota,
    existePruebaLaboratorioMascota,

    emailExiste,
    existeHerramienta,
    existeCapacitacion,
    existeTarea,
    existeUsuario,
}