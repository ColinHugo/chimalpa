const { Schema, model } = require( 'mongoose' );

const HistorialReproductivoConejoSchema = Schema( {

    fechaMonta1: {
        type: Date,
        required: [ true, 'La fecha de la primera monta es obligatoria.' ]
    },

    fechaMonta2: {
        type: Date,
        required: [ true, 'La segunda monta es obligatoria.' ]
    },

    observacionesConejo: {
        type: String,
        required: [ true, 'Las observaciones del semental son obligatorias.' ]
    },

    observacionesMonta: {
        type: String,
        required: [ true, 'Las observaciones de la monta son obligatorias.' ]
    },

    nido: {
        type: String,
        required: [ true, 'El nido del conejo es obligatorio.' ]
    },

    fechaDestete: {
        type: Date,
        required: [ true, 'El destete es obligatorio.' ]
    },

    gazaposVivos: {
        type: Number,
        required: [ true, 'Los gazapos vivos son obligatorios.' ]
    },

    gazaposMuertos: {
        type: Number,
        required: [ true, 'Los gazapos muertos son obligatorios.' ]
    },

    causaMuerte: {
        type: String,
        required: [ true, 'La causa de muerte de los gazapos vivos son obligatorios.' ]
    },

    coneja: {
        type: Schema.Types.ObjectId,
        ref: 'Conejo'
    },

    conejo: {
        type: Schema.Types.ObjectId,
        ref: 'Conejo'
    },

}, {
    versionKey: false,
    timestamps: true,
} );

HistorialReproductivoConejoSchema.methods.toJSON = function () {
    const { _id, ...historial } = this.toObject();
    historial.idHistorialReproductivo = _id;
    return historial;
}

module.exports = model( 'historial_reproductivo_conejo', HistorialReproductivoConejoSchema );