const { Schema, model } = require( 'mongoose' );

const MontaCaballoSchema = Schema( {

    fechaMonta: {
        type: Date
    },

    estado: {
        type: Boolean,
        default: false
    },

    yegua: {
        type: Schema.Types.ObjectId,
        ref: 'Caballo'
    },

    semental: {
        type: Schema.Types.ObjectId,
        ref: 'Caballo'
    },

    encargado: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    historialReproductivoCaballo: {
        type: Schema.Types.ObjectId,
        ref: 'historial_reproductivo_caballo'
    }

}, {
    versionKey: false,
    timestamps: true
} );

MontaCaballoSchema.methods.toJSON = function () {
    const { _id, ...monta } = this.toObject();
    monta.idMonta = _id;
    return monta;
}

module.exports = model( 'monta_caballo', MontaCaballoSchema );