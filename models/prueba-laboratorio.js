const { Schema, model } = require( 'mongoose' );

const PruebaLaboratorioSchema = Schema( {

    link: {
        type: String,
        required: [ true, 'El link de la prueba de laboratorio es obligatorio.' ]
    },

    caballo: {
        type: Schema.Types.ObjectId,
        ref: 'Caballo'
    }
}, {
    versionKey: false,
    timestamps: true
} );

PruebaLaboratorioSchema.methods.toJSON = function () {
    const { _id, ...prueba } = this.toObject();
    prueba.idPruebaLaboratorio = _id;
    return prueba;
}

module.exports = model( 'prueba_laboratorio', PruebaLaboratorioSchema );