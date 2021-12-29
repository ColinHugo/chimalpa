const { Schema, model } = require( 'mongoose' );

const AveSchema = Schema( {

    numeroAve : {
        type: String,
        required: [ true, 'El número de ave es obligatorio' ]
    },

    estado:{
        type: Boolean,
        default: 1
    },

    tipo: {
        type: String,
        required: [ true, 'El tipo de ave es obligatorio' ]
    },

    precio: {
        type: String,
        required: [ true, 'El precio del ave es obligatorio' ]
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

AveSchema.methods.toJSON = function () {
    const { _id, ...ave } = this.toObject();
    ave.idAve = _id;
    return ave;
}

module.exports = model( 'Ave', AveSchema );