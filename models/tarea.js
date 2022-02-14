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

    fechaLimite:{
        type: String,
        required: [ true, 'La fecha límite de la tarea es obligatoria' ]
    },

    encargado: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    empleado: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    evidencia: {
        type: String
    },

    estado: {
        type: Boolean,
        default: false
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