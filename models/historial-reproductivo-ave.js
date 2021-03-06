const { Schema, model } = require( 'mongoose' );

const HistorialReproductivoAveSchema = Schema( {

    fechaInicio: {
        type: Date,
        required: [ true, 'El inicio de celo es obligatorio.' ]
    },

    fechaTermino: {
        type: Date,
        required: [ true, 'El inicio de celo es obligatorio.' ]
    },    

    instrucciones: {
        type: String,
        required: [ true, 'El semental es obligatorio.' ]
    },

    aveHembra: {
        type: Schema.Types.ObjectId,
        ref: 'Ave'
    },

    aveMacho: {
        type: Schema.Types.ObjectId,
        ref: 'Ave'
    }

}, {
    versionKey: false,
    timestamps: true,
} );

HistorialReproductivoAveSchema.methods.toJSON = function () {
    const { _id, ...historial } = this.toObject();
    historial.idHistorialReproductivo = _id;
    return historial;
}

module.exports = model( 'historial_reproductivo_ave', HistorialReproductivoAveSchema );