const Borrego = require( './borrego' );
const Caballo = require( './caballo' );
const Control = require( './control' );
const Usuario = require( './usuario' );

const TratamientoPermanente = require( './tratamiento-permanente' );
const TratamientoPermanenteBorrego = require( './tratamiento-permanente-borrego' );

const DietaBorrego = require( './dieta-borrego' );
const DietaCaballo = require( './dieta-caballo' );
const DietaYegua = require( './dieta-yegua' );

const DesteteCaballo = require( './destete' );
const MedicinaPreventiva = require( './medicina-preventiva' );

const RecorteCasco = require( './recorte-casco' );
const Odontologia = require( './odontologia' );
const HistoriaClinica = require( './historia-clinica' );
const HistorialReproductivo = require( './historial-reproductivo' );
const PruebasLaboratorio = require( './prueba-laboratorio' );

module.exports = {
    Borrego,
    Caballo,
    Control,
    TratamientoPermanente,
    TratamientoPermanenteBorrego,
    Usuario,

    DietaBorrego,
    DietaCaballo,
    DietaYegua,

    DesteteCaballo,
    MedicinaPreventiva,

    RecorteCasco,
    Odontologia,
    HistoriaClinica,
    HistorialReproductivo,
    PruebasLaboratorio,
}