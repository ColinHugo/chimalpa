const { Schema, model } = require( 'mongoose' );

const CapacitacionSchema = Schema( {

    descripcion: {
        type: String,
        required: [ true, 'La descripción del video es obligatoria.' ]
    },

    video: {
        type: String,
        required: [ true, 'El link del video es obligatorio.' ]
    },   

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, {
    versionKey: false,
    timestamps: true,
} );

CapacitacionSchema.methods.toJSON = function () {
    const { _id, ...capacitacion } = this.toObject();
    capacitacion.idCapacitacion = _id;
    return capacitacion;
}

module.exports = model( 'capacitacion', CapacitacionSchema );