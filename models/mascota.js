const { Schema, model } = require( 'mongoose' );

const MascotaSchema = Schema( {

    nombre: {
        type: String,
        required: [ true, 'El nombre de la mascota es obligatorio' ]
    },

    estado:{
        type: Boolean,
        default: 1
    },

    raza: {
        type: String,
        required: [ true, 'La raza de la mascota es obligatoria' ]
    },

    sexo: {
        type: String,
        required: [ true, 'El sexo de la mascota es obligatorio' ]
    },

    uso: {
        type: String,
        required: [ true, 'El precio de la mascota es obligatorio' ]
    },

    precio: {
        type: String,
        required: [ true, 'El precio de la mascota es obligatorio' ]
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

MascotaSchema.methods.toJSON = function () {
    const { _id, ...mascota } = this.toObject();
    mascota.idMascota = _id;
    return mascota;
}

module.exports = model( 'Mascota', MascotaSchema );