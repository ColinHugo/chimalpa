const { Schema, model } = require( 'mongoose' );

const ConejoSchema = Schema( {

    numeroConejo : {
        type: String,
        required: [ true, 'El número del conejo es obligatorio' ]
    },

    estado:{
        type: Boolean,
        default: 1
    },

    tipo: {
        type: String,
        required: [ true, 'El tipo del conejo es obligatorio' ]
    },

    raza: {
        type: String,
        required: [ true, 'La raza del conejo es obligatoria' ]
    },

    color: {
        type: String,
        required: [ true, 'El color del conejo es obligatorio' ]
    },

    sexo: {
        type: String,
        required: [ true, 'El sexo del conejo es obligatorio' ]
    },

    camada: {
        type: String
    },

    fechaNacimiento: {
        type: Date,
        required: [ true, 'La fecha de nacimiento del conejo es obligatoria' ]
    },

    malaMadre: {
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

ConejoSchema.methods.toJSON = function () {
    const { _id, ...conejo } = this.toObject();
    conejo.idConejo = _id;
    return conejo;
}

module.exports = model( 'Conejo', ConejoSchema );