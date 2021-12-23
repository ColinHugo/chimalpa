const { Schema, model } = require( 'mongoose' );

const DietaBorregoSchema = Schema( {

    estado: {
        type: String,
        default: 'No aplica.'
    },

    avena_manana: {
        type: String,
        default: 'AVENA MAÑANA',
        required: [ true, 'La avena por la mañana es obligatoria.' ]
    },

    avena_cantidad_manana: {
        type: String,                
        required: [ true, 'La cantidad de la avena por la mañana es obligatoria.' ]
    },

    avena_tarde: {
        type: String,
        default: 'AVENA TARDE',
        required: [ true, 'La avena por la tarde es obligatoria.' ]
    },

    avena_cantidad_tarde: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de la avena por la tarde es obligatoria.' ]
    },

    alfalfa_manana: {
        type: String,
        default: 'ALFALFA MAÑANA',
        required: [ true, 'La alfalfa por la mañana es obligatoria.' ]
    },

    alfalfa_cantidad_manana: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de la alfalfa por la mañana es obligatoria.' ]
    },

    alfalfa_tarde: {
        type: String,
        default: 'ALFALFA TARDE',
        required: [ true, 'La alfalfa por la tarde es obligatoria.' ]
    },

    alfalfa_cantidad_tarde: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de la alfalfa por la tarde es obligatoria.' ]
    },

    grano_manana: {
        type: String,
        default: 'GRANO MAÑANA',
        required: [ true, 'El grano por la mañana es obligatorio.' ]
    },

    grano_cantidad_manana: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad del grano por la mañana es obligatorio.' ]
    },

    grano_tarde: {
        type: String,
        default: 'GRANO TARDE',
        required: [ true, 'El grano por la tarde es obligatorio.' ]
    },

    grano_cantidad_tarde: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad del grano por la tarde es obligatorio.' ]
    },

    aceite_manana: {
        type: String,
        default: 'ACEITE MAÑANA',
        required: [ true, 'El aceite por la mañana es obligatorio.' ]
    },

    aceite_cantidad_manana: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad del aceite por la mañana es obligatorio.' ]
    },

    aceite_tarde: {
        type: String,
        default: 'ACEITE TARDE',
        required: [ true, 'El aceite por la tarde es obligatorio.' ]
    },

    aceite_cantidad_tarde: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad del aceite por la tarde es obligatorio.' ]
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

DietaBorregoSchema.methods.toJSON = function () {
    
    const { _id, ...dietaBorrego } = this.toObject();
    dietaBorrego.idDieta = _id;
    return dietaBorrego;
}

module.exports = model( 'dieta_borrego', DietaBorregoSchema );