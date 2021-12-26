const { Schema, model } = require( 'mongoose' );

const PruebaLaboratorioBorregoSchema = Schema( {

    link: {
        type: String,
        required: [ true, 'El link de la prueba de laboratorio es obligatorio.' ]
    },

    borrego: {
        type: Schema.Types.ObjectId,
        ref: 'Borrego'
    }
}, {
    versionKey: false,
    timestamps: true
} );

PruebaLaboratorioBorregoSchema.methods.toJSON = function () {
    const { _id, ...prueba } = this.toObject();
    prueba.idPruebaLaboratorio = _id;
    return prueba;
}

module.exports = model( 'prueba_laboratorio_borrego', PruebaLaboratorioBorregoSchema );