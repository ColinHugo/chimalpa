const { Schema, model } = require( 'mongoose' );

const MedicinaAveSchema = Schema( {

    tipo: {
        type: String,
        required: [ true, 'El tipo de medicina es obligatorio.' ]
    },

    descripcion: {
        type: String,
        required: [ true, 'La descripcion es obligatoria.' ]
    },

    fecha: {
        type: String,
        required: [ true, 'La fecha es obligatoria.' ]
    },

    ave: {
        type: Schema.Types.ObjectId,
        ref: 'Ave'
    }

}, {
    versionKey: false,
    timestamps: true
} );

MedicinaAveSchema.methods.toJSON = function () {
    const { _id, ...medicina } = this.toObject();
    medicina.idMedicina = _id;
    return medicina;
}

module.exports = model( 'medicina_ave', MedicinaAveSchema );