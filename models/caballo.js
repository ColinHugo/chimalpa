const { Schema, model } = require( 'mongoose' );

const CaballoSchema = Schema( {

    nombre: {
        type: String,
        required: [ true, 'El nombre del caballo es obligatorio' ]
    },

    estado:{
        type: Boolean,
        default: 1
    },

    raza: {
        type: String,
        required: [ true, 'La raza del caballo es obligatoria' ]
    },

    padre: {
        type: String,
        default: 'Indefinido'
    },

    madre: {
        type: String,
        default: 'Indefinido'
    },

    sexo: {
        type: String,
        required: [ true, 'El sexo del caballo es obligatorio' ]
    },

    macho_gestante: {
        type: String,
        default: 'No aplica'
    },

    fecha_gestacion: {
        type: String,
        default: 'No aplica'
    },

    color: {
        type: String,
        required: [ true, 'El color del caballo es obligatorio' ]
    },

    peso_anterior: {
        type: String
    },

    peso_actual: {
        type: String
    },

    fecha_nacimiento: {
        type: String
    },

    edad: {
        type: String
    },

    pecho: {
        type: String
    },

    lomo: {
        type: String
    },

    cruz_cola: {
        type: String
    },

    folio: {
        type: String
    },

    chip: {
        type: String
    },

    alzada: {
        type: String
    },

    uso: {
        type: String
    },

    inventario: {
        type: String
    },

    status_venta: {
        type: String
    },

    comida: {
        type: String
    },

    agua: {
        type: String
    },

    qr: {
        type: String
    },

    foto: {
        type: String
    },
}, {
    versionKey: false
} );

module.exports = model( 'Caballo', CaballoSchema );