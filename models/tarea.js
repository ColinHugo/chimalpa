const { Schema, model } = require( 'mongoose' );

const TareaSchema = Schema( {

    nombre : {
        type: String,
        required: [ true, 'El nombre de la tarea es obligatorio' ]
    },

    descripcion:{
        type: String,
        required: [ true, 'La descripción de la tarea es obligatorio' ]
    },

    encargado: {
        type: String,
        required: [ true, 'El encargado de la tarea es obligatoria' ]
    },

    video: {
        type: String
    },    

    evidencia: {
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

TareaSchema.methods.toJSON = function () {
    const { _id, ...tarea } = this.toObject();
    tarea.idTarea = _id;
    return tarea;
}

module.exports = model( 'Tarea', TareaSchema );