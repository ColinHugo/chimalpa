const { Schema, model } = require( 'mongoose' );

const PruebaLaboratorioConejoSchema = Schema( {

    link: {
        type: String,
        required: [ true, 'El link de la prueba de laboratorio es obligatorio.' ]
    },

    conejo: {
        type: Schema.Types.ObjectId,
        ref: 'Conejo'
    }
}, {
    versionKey: false,
    timestamps: true
} );

PruebaLaboratorioConejoSchema.methods.toJSON = function () {
    const { _id, ...prueba } = this.toObject();
    prueba.idPruebaLaboratorio = _id;
    return prueba;
}

module.exports = model( 'prueba_laboratorio_conejo', PruebaLaboratorioConejoSchema );