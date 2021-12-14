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

    color: {
        type: String,
        required: [ true, 'El color del caballo es obligatorio' ]
    },

    fecha_nacimiento: {
        type: String
    },

    edad: {
        type: String
    },

    folio: {
        type: String
    },

    chip: {
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

    qr: {
        type: String
    },

    foto: {
        type: String
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, {
    versionKey: false,
    timestamps: true
} );

CaballoSchema.methods.toJSON = function () {
    const { _id, ...caballo } = this.toObject();
    caballo.idCaballo = _id;
    return caballo;
}

module.exports = model( 'Caballo', CaballoSchema );