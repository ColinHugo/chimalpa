const { Schema, model } = require( 'mongoose' );

const MedicinaMascotaSchema = Schema( {

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

    mascota: {
        type: Schema.Types.ObjectId,
        ref: 'Mascota'
    }

}, {
    versionKey: false,
    timestamps: true
} );

MedicinaMascotaSchema.methods.toJSON = function () {
    const { _id, ...medicina } = this.toObject();
    medicina.idMedicina = _id;
    return medicina;
}

module.exports = model( 'medicina_mascota', MedicinaMascotaSchema );