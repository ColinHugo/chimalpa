const { Schema, model } = require( 'mongoose' );

const PruebaLaboratorioAveSchema = Schema( {

    link: {
        type: String,
        required: [ true, 'El link de la prueba de laboratorio es obligatorio.' ]
    },

    ave: {
        type: Schema.Types.ObjectId,
        ref: 'Ave'
    }
}, {
    versionKey: false,
    timestamps: true
} );

PruebaLaboratorioAveSchema.methods.toJSON = function () {
    const { _id, ...prueba } = this.toObject();
    prueba.idPruebaLaboratorio = _id;
    return prueba;
}

module.exports = model( 'prueba_laboratorio_ave', PruebaLaboratorioAveSchema );