const { Schema, model } = require( 'mongoose' );

const TratamientoPermanenteMascotaSchema = Schema( {

    tipo: {
        type: String,
        required: [ true, 'El tipo de tratamiento para la mascota es obligatorio.' ]
    },

    descripcion: {
        type: String,
        required: [ true, 'La descripción del tratamiento para la mascota es obligatoria.' ]
    },

    video: {
        type: String,
    },

    mascota: {
        type: Schema.Types.ObjectId,
        ref: 'Mascota'
    },

}, {
    versionKey: false,
    timestamps: true
} );

TratamientoPermanenteMascotaSchema.methods.toJSON = function () {
    const { _id, ...tratamiento } = this.toObject();
    tratamiento.idTratamiento = _id;
    return tratamiento;
}

module.exports = model( 'tratamiento_permanente_mascota', TratamientoPermanenteMascotaSchema );