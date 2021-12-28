const { Schema, model } = require( 'mongoose' );

const HistorialReproductivoConejoSchema = Schema( {

    montaAnterior: {
        type: String,
        required: [ true, 'La monta anterior es obligatoria.' ]
    },

    fechaMonta1: {
        type: String,
        required: [ true, 'La fecha de la primera monta es obligatoria.' ]
    },

    semental: {
        type: String,
        required: [ true, 'El semental es obligatorio.' ]
    },

    opcionSemental: {
        type: String,
        required: [ true, 'La opción del semental es obligatoria.' ]
    },

    observacionesSemental: {
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

    monta2: {
        type: String,
        required: [ true, 'La segunda monta es obligatoria.' ]
    },

    destete: {
        type: String,
        required: [ true, 'El destete es obligatorio.' ]
    },

    gazaposVivos: {
        type: String,
        required: [ true, 'Los gazapos vivos son obligatorios.' ]
    },

    gazaposMuertos: {
        type: String,
        required: [ true, 'Los gazapos muertos son obligatorios.' ]
    },

    causaMuerte: {
        type: String,
        required: [ true, 'La causa de muerte de los gazapos vivos son obligatorios.' ]
    },

    conejo: {
        type: Schema.Types.ObjectId,
        ref: 'Conejo'
    }

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