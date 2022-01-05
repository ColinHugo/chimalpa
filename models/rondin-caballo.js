const { Schema, model } = require( 'mongoose' );

const RondinCaballoSchema = Schema( {

    agua: {
        type: String,
        required: [ true, 'El agua del caballo es obligatorio.' ]
    },

    descripcionAgua: {
        type: String,
        required: [ true, 'La descripción del agua del caballo es obligatoria.' ]
    },    

    fotoAgua: {
        type: String,
    },

    comida: {
        type: String,
        required: [ true, 'La comida del caballo es obligatoria.' ]
    },

    descripcionComida: {
        type: String,
        required: [ true, 'La descripción de la comida del caballo es obligatoria.' ]
    },    

    fotoComida: {
        type: String,
    },

    hece: {
        type: String,
        required: [ true, 'La hece del caballo es obligatoria.' ]
    },

    descripcionHece: {
        type: String,
        required: [ true, 'La descripción de la hece del caballo es obligatoria.' ]
    },    

    fotoHece: {
        type: String,
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
    timestamps: true,
} );

RondinCaballoSchema.methods.toJSON = function () {
    const { _id, ...rondin } = this.toObject();
    rondin.idRondin = _id;
    return rondin;
}

module.exports = model( 'rondin_caballo', RondinCaballoSchema );