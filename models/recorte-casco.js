const { Schema, model } = require( 'mongoose' );

const RecorteCascoSchema = Schema( {

    frecuencia: {
        type: String,
        required: [ true, 'La frecuencia del recorte del casco es obligatoria.' ]
    },

    descripcion: {
        type: String,
        required: [ true, 'La descripción del recorte del casco es obligatoria.' ]
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

