const { Schema, model } = require( 'mongoose' );

const AlertaSchema = Schema( {

    descripcion : {
        type: String,
        required: [ true, 'La descripción de la alerta es obligatoria.' ]
    },

    foto: {
        type: String
    },

    caballo: {
        type: Schema.Types.ObjectId,
        ref: 'Caballo'
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, {
    versionKey: false,
    timestamps: true
} );

AlertaSchema.methods.toJSON = function () {
    const { _id, ...alerta } = this.toObject();
    alerta.idAlerta = _id;
    return alerta;
}

module.exports = model( 'Alerta', AlertaSchema );