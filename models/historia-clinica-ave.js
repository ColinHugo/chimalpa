const { Schema, model } = require( 'mongoose' );

const HistoriaClinicaAveSchema = Schema( {

    estadoNutricional: {
        type: String,
        required: [ true, 'El estado nutricional es obligatorio' ]
    },

    piel: {
        type: String,
        required: [ true, 'El estado de la piel es obligatorio' ]
    },

    pelo: {
        type: String,
        required: [ true, 'El estado del pelo es obligatorio' ]
    },

    sensorio: {
        type: String,
        required: [ true, 'El estado sensorial es obligatorio' ]
    },

    faciales: {
        type: String,
        required: [ true, 'El estado facial es obligatorio' ]
    },

    actitudes: {
        type: String,
        required: [ true, 'Las actitudes son obligatorias' ]
    },

    deformaciones: {
        type: String,
        required: [ true, 'Las deformaciones evidentes son obligatorias' ]
    },

    hallazgos: {
        type: String,
        required: [ true, 'Los hallazgos notables son obligatorios' ]
    },

    mucosa: {
        type: String,
        required: [ true, 'El estado de la mucosa es obligatoria' ]
    },

    llenadoCapilar: {
        type: String,
        required: [ true, 'El llenado capilar es obligatorio' ]
    },

    linfonodos: {
        type: String,
        required: [ true, 'La exploración de los linfónodos superficiales es obligatoria' ]
    },

    corazon: {
        type: String,
        required: [ true, 'El pulso y frecuencia cardiaca son obligatorias' ]
    },

    respiracion: {
        type: String,
        required: [ true, 'Tipo y frecuencia respiratoria son sobligatorios' ]
    },

    pulmones: {
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

    sonidosIntestinales: {
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

    examenOtologico: {
        type: String,
        required: [ true, 'El examen otológico es obligatorio' ]
    },

    aparatoLocomotor: {
        type: String,
        required: [ true, 'El aparato locomotor es obligatorio' ]
    },

    examenNeurologico: {
        type: String,
        required: [ true, 'El examen neurológico es obligatorio' ]
    },

    pronostico: {
        type: String,
        required: [ true, 'El pronóstico es obligatorio' ]
    },

    tratamiento: {
        type: String,
        required: [ true, 'El tratamiento es obligatorio' ]
    },

    ave: {
        type: Schema.Types.ObjectId,
        ref: 'Ave'
    }

}, {
    versionKey: false,
    timestamps: true
} );

HistoriaClinicaAveSchema.methods.toJSON = function () {
    const { _id, ...historia } = this.toObject();
    historia.idHistoria = _id;
    return historia;
}

module.exports = model( 'historia_clinica_ave', HistoriaClinicaAveSchema );