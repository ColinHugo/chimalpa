const { Schema, model } = require( 'mongoose' );

const OdontologiaSchema = Schema( {

    tratamiento: {
        type: String,
        required: [ true, 'El tratamiento es obligatorio' ]
    },

    descripcion: {
        type: String,
        required: [ true, 'La descripción de la odontología es obligatoria' ]
    },

    ultimaFecha: {
        type: String
    },

    proximaFecha: {
        type: String
    },

    caballo: {
        type: Schema.Types.ObjectId,
        ref: 'Caballo'
    }

}, {
    versionKey: false,
    timestamps: true
} );

OdontologiaSchema.methods.toJSON = function () {
    const { _id, ...odontologia } = this.toObject();
    odontologia.idOdontologia = _id;
    return odontologia;
}

module.exports = model( 'Odontologia', OdontologiaSchema );

