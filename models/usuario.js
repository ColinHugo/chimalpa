const { Schema, model } = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );

const UsuarioSchema = Schema( {

    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ],
    },

    apellidos: {
        type: String,
        required: [ true, 'Los apellidos son obligatorios' ],
    },

    correo: {
        type: String,
        required: [ true, 'El correo es obligatorio' ],
        unique: true
    },

    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria' ],
    },

    foto: {
        type: String,
    },

    rol: {
        type: Number,
        default: 3,
        enum: [ 1, 2, 3 ]
    },

    descanso: {
        type: String
    },

    estado: {
        type: Boolean,
        default: true,
    }
}, {
    versionKey: false
} );

UsuarioSchema.statics.encryptPassword = ( password ) => {

    const salt = bcrypt.genSalt();

    return bcrypt.hashSync( password, salt );
}

UsuarioSchema.statics.comparePassword = async ( password, receivedPassword ) => {
    return await bcrypt.compare( password, receivedPassword );
}

UsuarioSchema.methods.toJSON = function () {
    
    const { password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );