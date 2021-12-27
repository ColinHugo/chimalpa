const { Schema, model } = require( 'mongoose' );

const MedicinaConejoSchema = Schema( {

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

    conejo: {
        type: Schema.Types.ObjectId,
        ref: 'Conejo'
    }

}, {
    versionKey: false,
    timestamps: true
} );

MedicinaConejoSchema.methods.toJSON = function () {
    const { _id, ...medicina } = this.toObject();
    medicina.idMedicina = _id;
    return medicina;
}

module.exports = model( 'medicina_conejo', MedicinaConejoSchema );