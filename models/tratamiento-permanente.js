const { Schema, model } = require( 'mongoose' );

const TratamientoPermanenteSchema = Schema( {

    tratamiento: {
        type: String,
        required: [ true, 'El tratamiento es obligatorio.' ]
    },

    descripcion: {
        type: String,
        required: [ true, 'La descripción es obligatoria.' ]
    },

    ultimaFecha: {
        type: String
    },

    proximaFecha: {
        type: String
    },

    video: {
        type: String,
    },

    caballo: {
        type: Schema.Types.ObjectId,
        ref: 'Caballo'
    },

}, {
    versionKey: false,
    timestamps: true
} );

TratamientoPermanenteSchema.methods.toJSON = function () {
    const { _id, ...tratamiento } = this.toObject();
    tratamiento.idTratamiento = _id;
    return tratamiento;
}

module.exports = model( 'tratamiento_permanente', TratamientoPermanenteSchema );