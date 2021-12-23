const { Schema, model } = require( 'mongoose' );

const BorregoSchema = Schema( {

    numeroBorrego : {
        type: String,
        required: [ true, 'El número del borrego es obligatorio' ]
    },

    estado:{
        type: Boolean,
        default: 1
    },

    sexo: {
        type: String,
        required: [ true, 'El sexo del borrego es obligatorio' ]
    },

    fechaNacimiento: {
        type: String
    },

    padre: {
        type: String,
        default: 'Indefinido'
    },

    madre: {
        type: String,
        default: 'Indefinido'
    },

    peso:{
        type: String,
        required: [ true, 'El peso del borrego es obligatorio' ]
    },

    kilo:{
        type: String,
        required: [ true, 'El kilo del borrego es obligatorio' ]
    },

    inventario:{
        type: String
    },

    rebano:{
        type: String,
        required: [ true, 'El rebaño del borrego es obligatorio' ]
    },

    reproducción:{
        type: String
    },

    uso: {
        type: String
    },

    maternidad:{
        type: String,
    },

    crias:{
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

BorregoSchema.methods.toJSON = function () {
    const { _id, ...borrego } = this.toObject();
    borrego.idBorrego = _id;
    return borrego;
}

module.exports = model( 'Borrego', BorregoSchema );