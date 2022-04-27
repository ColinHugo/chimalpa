const { Schema, model } = require( 'mongoose' );

const RecorteCascoSchema = Schema( {

    instrucciones: {
        type: String,
        required: [ true, 'Las instrucciones del recorte del casco son obligatorias.' ]
    },

    ultimaFecha: {
        type: Date,
        required: [ true, 'La última fecha del recorte de cascos es obligatoria.' ]
    },

    proximaFecha: {
        type: Date,
        required: [ true, 'La proxima fecha del recorte de cascos es obligatoria.' ]
    },

    caballo: {
        type: Schema.Types.ObjectId,
        ref: 'Caballo'
    }
}, {
    versionKey: false,
    timestamps: true
} );

RecorteCascoSchema.methods.toJSON = function () {
    const { _id, ...casco } = this.toObject();
    casco.idCasco = _id;
    return casco;
}

module.exports = model( 'recorte_casco', RecorteCascoSchema );

