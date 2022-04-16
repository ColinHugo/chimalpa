const { Schema, model } = require( 'mongoose' );

const HistorialReproductivoCaballoSchema = Schema( {

    inicioCelo: {
        type: Date,
        required: [ true, 'El inicio de celo es obligatorio.' ]
    },

    yegua: {
        type: Schema.Types.ObjectId,
        ref: 'Caballo'
    },

    semental: {
        type: Schema.Types.ObjectId,
        ref: 'Caballo'
    },

    tipoMonta: {
        type: String,
        required: [ true, 'El tipo de monta es obligatorio.' ]
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

}, {
    versionKey: false,
    timestamps: true,
} );

HistorialReproductivoCaballoSchema.methods.toJSON = function () {
    const { _id, ...historial } = this.toObject();
    historial.idHistorialReproductivo = _id;
    return historial;
}

module.exports = model( 'historial_reproductivo_caballo', HistorialReproductivoCaballoSchema );