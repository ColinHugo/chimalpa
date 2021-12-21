const Caballo = require( './caballo' );
const Control = require( './control' );
const Usuario = require( './usuario' );

const TratamientoPermanente = require( './tratamiento-permanente' );

const DietaCaballo = require( './dieta-caballo' );
const DietaYegua = require( './dieta-yegua' );

const DesteteCaballo = require( './destete' );
const MedicinaPreventiva = require( './medicina-preventiva' );

const RecorteCasco = require( './recorte-casco' );
const Odontologia = require( './odontologia' );
const HistoriaClinica = require( './historia-clinica' );
const HistorialReproductivo = require( './historial-reproductivo' );

module.exports = {
    Caballo,
    Control,
    TratamientoPermanente,
    Usuario,

    DietaCaballo,
    DietaYegua,

    DesteteCaballo,
    MedicinaPreventiva,

    RecorteCasco,
    Odontologia,
    HistoriaClinica,
    HistorialReproductivo,
}