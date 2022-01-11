const { Schema, model } = require( 'mongoose' );

const HistoriaClinicaBorregoSchema = Schema( {

    inspeccion: {
        type: String,
        required: [ true, 'La inspección es obligatoria' ]
    },

    mucosa: {
        type: String,
        required: [ true, 'El estado de la mucosa es obligatoria' ]
    },

    capilar: {
        type: String,
        required: [ true, 'El llenado capilar es obligatorio' ]
    },

    linfonodos: {
        type: String,
        required: [ true, 'La exploración de los linfónodos superficiales es obligatoria' ]
    },

    cardiaca: {
        type: String,
        required: [ true, 'El pulso y frecuencia cardiaca son obligatorias' ]
    },

    respiratoria: {
        type: String,
        required: [ true, 'Tipo y frecuencia respiratoria son sobligatorios' ]
    },

    pulmonares: {
        type: String,
        required: [ true, 'Los campos pulmonares son obligatorios' ]
    },

    hidratacion: {
        type: String,
        required: [ true, 'El estado de hidratación es obligatorio' ]
    },

    temperatura: {
        type: String,
        required: [ true, 'La temperatura es obligatoria' ]
    },

    intestinales: {
        type: String,
        required: [ true, 'Los sonidos intestinales son obligatorios' ]
    },

    heces: {
        type: String,
        required: [ true, 'El estado de la hece es obligatoria' ]
    },

    aparatoRespiratorio: {
        type: String,
        required: [ true, 'El aparato respiratorio es obligatorio' ]
    },

    aparatoCardiovascular: {
        type: String,
        required: [ true, 'El aparato cardiovascular es obligatorio' ]
    },

    examenDermatologico: {
        type: String,
        required: [ true, 'El examen dermatologico es obligatorio' ]
    },

    aparatoDigestivo: {
        type: String,
        required: [ true, 'El aparato digestivo es obligatorio' ]
    },

    aparatoUrinario: {
        type: String,
        required: [ true, 'El aparato urinario es obligatorio' ]
    },

    aparatoReproductor: {
        type: String,
        required: [ true, 'El aparato reproductor es obligatorio' ]
    },

    examenOftalmologico: {
        type: String,
        required: [ true, 'El examen oftamologico es obligatorio' ]
    },

    aparatoLocomotor: {
        type: String,
        required: [ true, 'El aparato locomotor es obligatorio' ]
    },

    examenNeurologico: {
        type: String,
        required: [ true, 'El examen neurológico es obligatorio' ]
    },

    tratamiento: {
        type: String,
        required: [ true, 'El tratamiento es obligatorio' ]
    },

    pronostico: {
        type: String,
        required: [ true, 'El pronóstico es obligatorio' ]
    },

    borrego: {
        type: Schema.Types.ObjectId,
        ref: 'Borrego'
    }

}, {
    versionKey: false,
    timestamps: true
} );

HistoriaClinicaBorregoSchema.methods.toJSON = function () {
    const { _id, ...historia } = this.toObject();
    historia.idHistoria = _id;
    return historia;
}

module.exports = model( 'historia_clinica_borrego', HistoriaClinicaBorregoSchema );