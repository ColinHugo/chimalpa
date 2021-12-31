const { Schema, model } = require( 'mongoose' );

const CuarentenaAveSchema = Schema( {

    fechaInicio: {
        type: String,                
        required: [ true, 'La fecha de inicio de la cuarentena es obligatoria.' ]
    },

    fechaTermino: {
        type: String,                
        required: [ true, 'La fecha de término de la cuarentena es obligatoria.' ]
    },

    instrucciones: {
        type: String,                
        required: [ true, 'Las instrucciones de la cuarentena es obligatoria.' ]
    },    

    ave: {
        type: Schema.Types.ObjectId,
        ref: 'Ave'
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, {
    versionKey: false,
    timestamps: true
} );

CuarentenaAveSchema.methods.toJSON = function () {
    
    const { _id, ...cuarentenaAve } = this.toObject();
    cuarentenaAve.idCuarentena = _id;
    return cuarentenaAve;
}

module.exports = model( 'cuarentena_ave', CuarentenaAveSchema );