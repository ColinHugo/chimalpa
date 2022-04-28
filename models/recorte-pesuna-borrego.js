const { Schema, model } = require( 'mongoose' );

const RecortePesunaBorregoSchema = Schema( {

    descripcion: {
        type: String,
        required: [ true, 'La descripción del recorte de pesuñas es obligatoria.' ]
    },

    ultimaFecha: {
        type: Date,
        required: [ true, 'La última fecha del recorte de pesunas es obligatoria.' ]
    },

    proximaFecha: {
        type: Date,
        required: [ true, 'La proxima fecha del recorte de pesunas es obligatoria.' ]
    },

    borrego: {
        type: Schema.Types.ObjectId,
        ref: 'Borrego'
    }
}, {
    versionKey: false,
    timestamps: true
} );

RecortePesunaBorregoSchema.methods.toJSON = function () {
    const { _id, ...pesuna } = this.toObject();
    pesuna.idPesuna = _id;
    return pesuna;
}

module.exports = model( 'recorte_pesuna_borrego', RecortePesunaBorregoSchema );

