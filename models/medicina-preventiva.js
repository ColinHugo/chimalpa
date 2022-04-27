const { Schema, model } = require( 'mongoose' );

const MedicinaPreventivaSchema = Schema( {

    tipoMedicina: {
        type: String,
        required: [ true, 'La medicina preventiva es obligatoria.' ]
    },

    descripcion: {
        type: String,
        required: [ true, 'La descripcion de la medicina es obligatoria.' ]
    },

    ultimaFecha: {
        type: Date,
        required: [ true, 'La última fecha de la medicina es obligatoria.' ]
    },

    proximaFecha: {
        type: Date,
        required: [ true, 'La proxima fecha de la medicina es obligatoria.' ]
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