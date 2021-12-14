const { Schema, model } = require( 'mongoose' );

const MedicinaPreventivaSchema = Schema( {

    tipoMedicina: {
        type: String,
        required: [ true, 'La medicina preventiva es obligatoria.' ]
    },

    descripcion: {
        type: String,
        required: [ true, 'La descripcion es obligatoria.' ]
    },

    fecha: {
        type: String,
        required: [ true, 'La fecha es obligatoria.' ]
    },

    caballo: {
        type: Schema.Types.ObjectId,
        ref: 'Caballo'
    }

}, {
    versionKey: false,
    timestamps: true
} );

MedicinaPreventivaSchema.methods.toJSON = function () {
    const { _id, ...medicina } = this.toObject();
    medicina.idMedicina = _id;
    return medicina;
}

module.exports = model( 'medicina_preventiva', MedicinaPreventivaSchema );