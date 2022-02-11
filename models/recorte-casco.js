const { Schema, model } = require( 'mongoose' );

const RecorteCascoSchema = Schema( {

    instrucciones: {
        type: String,
        required: [ true, 'Las instrucciones del recorte del casco son obligatorias.' ]
    },

    ultimaFecha: {
        type: String
    },

    proximaFecha: {
        type: String
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

