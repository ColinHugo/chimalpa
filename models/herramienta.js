const { Schema, model } = require( 'mongoose' );

const HerramientaSchema = Schema( {

    cantidad : {
        type: Number,
        required: [ true, 'La cantidad de herramientas es necesaria.' ]
    },

    tipo: {
        type: String,
        required: [ true, 'El tipo de herramienta es obligatoria.' ]
    },

    descripcion: {
        type: String,
        required: [ true, 'La descripción de herramienta es obligatoria.' ]
    },    

    qr: {
        type: String
    },

    foto: {
        type: String
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, {
    versionKey: false,
    timestamps: true
} );

HerramientaSchema.methods.toJSON = function () {
    const { _id, ...herramienta } = this.toObject();
    herramienta.idHerramienta = _id;
    return herramienta;
}

module.exports = model( 'Herramienta', HerramientaSchema );