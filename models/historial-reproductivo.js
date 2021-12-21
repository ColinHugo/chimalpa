const { Schema, model } = require( 'mongoose' );

const HistorialReproductivoSchema = Schema( {

    fechaCreacion: {
        type: Date,
        default: Date.now
    },

    inicioCelo: {
        type: String,
        required: [ true, 'El inicio de celo es obligatorio.' ]
    },

    semental: {
        type: String,
        required: [ true, 'El semental es obligatorio.' ]
    },

    tipoMonta: {
        type: String,
        required: [ true, 'El tipo de monta es obligatorio.' ]
    },

    caballo: {
        type: Schema.Types.ObjectId,
        ref: 'Caballo'
    }

}, {
    versionKey: false,
    timestamps: true,
} );

HistorialReproductivoSchema.methods.toJSON = function () {
    const { _id, ...historial } = this.toObject();
    historial.idHistorialReproductivo = _id;
    return historial;
}

module.exports = model( 'historial_reproductivo', HistorialReproductivoSchema );







