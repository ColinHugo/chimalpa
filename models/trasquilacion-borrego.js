const { Schema, model } = require( 'mongoose' );

const TrasquilacionBorregoSchema = Schema( {

    fecha: {
        type: String,
        required: [ true, 'La fecha de la trasquilación del borrego es obligatoria.' ]
    },

    descripcion: {
        type: String,
        required: [ true, 'La descripción de la trasquilación del borrego es obligatoria.' ]
    },

    borrego: {
        type: Schema.Types.ObjectId,
        ref: 'Borrego'
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {
    versionKey: false,
    timestamps: true
} );

TrasquilacionBorregoSchema.methods.toJSON = function () {
    const { _id, ...trasquilacion } = this.toObject();
    trasquilacion.idTrasquilacion = _id;
    return trasquilacion;
}

module.exports = model( 'trasquilacion_borrego', TrasquilacionBorregoSchema );