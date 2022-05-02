const { Schema, model } = require( 'mongoose' );

const HistorialReproductivoMascotaSchema = Schema( {

    numeroExpediente: {
        type: String,
        required: [ true, 'El número de expediente es obligatorio.' ]
    },

    fechaCreacion: {
        type: Date,
        required: [ true, 'La fecha de creación es obligatoria.' ]
    },

    inicioCelo: {
        type: String,
        required: [ true, 'El inicio de celo es obligatorio.' ]
    },

    tipo: {
        type: String,
        required: [ true, 'El tipo de reproducción es obligatorio.' ]
    },    

    mascota: {
        type: Schema.Types.ObjectId,
        ref: 'Mascota'
    }

}, {
    versionKey: false,
    timestamps: true,
} );

HistorialReproductivoMascotaSchema.methods.toJSON = function () {
    const { _id, ...historial } = this.toObject();
    historial.idHistorialReproductivo = _id;
    return historial;
}

module.exports = model( 'historial_reproductivo_mascota', HistorialReproductivoMascotaSchema );