const { Schema, model } = require( 'mongoose' );

const TratamientoPermanenteBorregoSchema = Schema( {

    tipo: {
        type: String,
        required: [ true, 'El tipo de tratamiento para el borrego es obligatorio.' ]
    },

    descripcion: {
        type: String,
        required: [ true, 'La descripción del tratamiento para el borrego es obligatoria.' ]
    },

    video: {
        type: String,
    },

    borrego: {
        type: Schema.Types.ObjectId,
        ref: 'Borrego'
    },

}, {
    versionKey: false,
    timestamps: true
} );

TratamientoPermanenteBorregoSchema.methods.toJSON = function () {
    const { _id, ...tratamiento } = this.toObject();
    tratamiento.idTratamiento = _id;
    return tratamiento;
}

module.exports = model( 'tratamiento_permanente_borrego', TratamientoPermanenteBorregoSchema );