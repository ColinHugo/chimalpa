const { Schema, model } = require( 'mongoose' );

const HistorialReproductivoBorregoSchema = Schema( {

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

    borrego: {
        type: Schema.Types.ObjectId,
        ref: 'Borrego'
    }

}, {
    versionKey: false,
    timestamps: true,
} );

HistorialReproductivoBorregoSchema.methods.toJSON = function () {
    const { _id, ...historial } = this.toObject();
    historial.idHistorialReproductivo = _id;
    return historial;
}

module.exports = model( 'historial_reproductivo_borrego', HistorialReproductivoBorregoSchema );