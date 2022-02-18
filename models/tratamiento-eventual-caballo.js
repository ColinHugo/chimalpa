const { Schema, model } = require( 'mongoose' );

const TratamientoEventualCaballoSchema = Schema( {

    tratamiento: {
        type: String,
        required: [ true, 'El tratamiento es obligatorio.' ]
    },

    descripcion: {
        type: String,
        required: [ true, 'La descripción es obligatoria.' ]
    },

    fechaInicio: {
        type: String,
        required: [ true, 'La fecha de inicio es obligatoria.' ]
    },

    fechaTermino: {
        type: String,
        required: [ true, 'La fecha de término es obligatoria.' ]
    },

    video: {
        type: String,
    },

    caballo: {
        type: Schema.Types.ObjectId,
        ref: 'Caballo'
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

}, {
    versionKey: false,
    timestamps: true
} );

TratamientoEventualCaballoSchema.methods.toJSON = function () {
    const { _id, ...tratamiento } = this.toObject();
    tratamiento.idTratamiento = _id;
    return tratamiento;
}

module.exports = model( 'tratamiento_eventual_caballo', TratamientoEventualCaballoSchema );