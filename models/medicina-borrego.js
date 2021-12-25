const { Schema, model } = require( 'mongoose' );

const MedicinaBorregoSchema = Schema( {

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

    borrego: {
        type: Schema.Types.ObjectId,
        ref: 'Borrego'
    }

}, {
    versionKey: false,
    timestamps: true
} );

MedicinaBorregoSchema.methods.toJSON = function () {
    const { _id, ...medicina } = this.toObject();
    medicina.idMedicina = _id;
    return medicina;
}

module.exports = model( 'medicina_borrego', MedicinaBorregoSchema );