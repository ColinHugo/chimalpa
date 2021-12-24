const { Schema, model } = require( 'mongoose' );

const RecortePesunaBorregoSchema = Schema( {

    fecha: {
        type: String,
        required: [ true, 'La fecha del recorte de pesuñas es obligatoria.' ]
    },

    descripcion: {
        type: String,
        required: [ true, 'La descripción del recorte de pesuñas es obligatoria.' ]
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

