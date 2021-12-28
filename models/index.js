const Borrego = require( './borrego' );
const DietaBorrego = require( './dieta-borrego' );
const RecortePesunaBorrego = require( './recorte-pesuna-borrego' );
const TrasquilacionBorrego = require( './trasquilacion-borrego' );
const TratamientoPermanenteBorrego = require( './tratamiento-permanente-borrego' );
const MedicinaBorrego = require( './medicina-borrego' );
const HistoriaClinicaBorrego = require( './historia-clinica-borrego' );
const HistorialReproductivoBorrego = require( './historial-reproductivo-borrego' );
const PruebaLaboratorioBorrego = require( './prueba-laboratorio-borrego' );

const Caballo = require( './caballo' );
const DesteteCaballo = require( './destete' );
const DietaCaballo = require( './dieta-caballo' );
const DietaYegua = require( './dieta-yegua' );
const HistoriaClinica = require( './historia-clinica' );
const HistorialReproductivo = require( './historial-reproductivo' );
const MedicinaPreventiva = require( './medicina-preventiva' );
const Odontologia = require( './odontologia' );
const PruebasLaboratorio = require( './prueba-laboratorio' );
const RecorteCasco = require( './recorte-casco' );
const TratamientoPermanente = require( './tratamiento-permanente' );

const Conejo = require( './conejo' );
const DietaConejo = require( './dieta-conejo' );
const MedicinaConejo = require( './medicina-conejo' );
const HistoriaClinicaConejo = require( './historia-clinica-conejo');

const Control = require( './control' );
const Usuario = require( './usuario' );

module.exports = {
    Borrego,
    TrasquilacionBorrego,
    DietaBorrego,
    RecortePesunaBorrego,
    TratamientoPermanenteBorrego,
    MedicinaBorrego,
    HistoriaClinicaBorrego,
    HistorialReproductivoBorrego,
    PruebaLaboratorioBorrego,

    Conejo,
    DietaConejo,
    MedicinaConejo,
    HistoriaClinicaConejo,

    Caballo,
    TratamientoPermanente,
    DietaCaballo,
    DietaYegua,
    DesteteCaballo,
    MedicinaPreventiva,
    RecorteCasco,
    Odontologia,
    HistoriaClinica,
    HistorialReproductivo,
    PruebasLaboratorio,

    Usuario,
    Control,
}