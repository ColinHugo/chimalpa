const { Schema, model } = require( 'mongoose' );

const DesteteSchema = Schema( {

    fecha: {
        type: Date,
        required: [ true, 'La fecha del destete es obligatoria.' ]
    },

    instrucciones: {
        type: String,
        required: [ true, 'Las instrucciones del destete son obligatorias.' ]
    },

    caballo: {
        type: Schema.Types.ObjectId,
        ref: 'Caballo'
    },

},{
    versionKey: false,
    timestamps: true
} );

DesteteSchema.methods.toJSON = function () {
    
    const { _id, ...destete } = this.toObject();
    destete.idDestete = _id;
    return destete;
}

module.exports = model( 'destete_caballo', DesteteSchema );