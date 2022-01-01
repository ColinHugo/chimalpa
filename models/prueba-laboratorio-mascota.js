const { Schema, model } = require( 'mongoose' );

const PruebaLaboratorioMascotaSchema = Schema( {

    link: {
        type: String,
        required: [ true, 'El link de la prueba de laboratorio es obligatorio.' ]
    },

    mascota: {
        type: Schema.Types.ObjectId,
        ref: 'Mascota'
    }
}, {
    versionKey: false,
    timestamps: true
} );

PruebaLaboratorioMascotaSchema.methods.toJSON = function () {
    const { _id, ...prueba } = this.toObject();
    prueba.idPruebaLaboratorio = _id;
    return prueba;
}

module.exports = model( 'prueba_laboratorio_mascota', PruebaLaboratorioMascotaSchema );