const { Schema, model } = require( 'mongoose' );

const MontaCaballoSchema = Schema( {

    fechaMonta: {
        type: String
    },

    estado: {
        type: Boolean,
        default: false
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    caballo: {
        type: Schema.Types.ObjectId,
        ref: 'Caballo'
    },

    historialReproductivo: {
        type: Schema.Types.ObjectId,
        ref: 'historial_reproductivo'
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