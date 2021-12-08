const { Schema, model } = require( 'mongoose' );

const DietaYeguaSchema = Schema( {

    // * * * * * * * * * * A V E N A * * * * * * * * * *

    avena_manana: {
        type: String,
        default: 'AVENA MAÑANA',
        required: [ true, 'La avena por la mañana es obligatoria.' ]
    },

    avena_cantidad_manana_vacia: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de la avena por la mañana cuando está vacia es obligatoria.' ]
    },

    avena_cantidad_manana_gestante: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de la avena por la mañana cuando está gestante es obligatoria.' ]
    },

    avena_cantidad_manana_cria: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de la avena por la mañana cuando tiene cría es obligatoria.' ]
    },

    avena_tarde: {
        type: String,
        default: 'AVENA TARDE',
        required: [ true, 'La avena por la tarde es obligatoria.' ]
    },

    avena_cantidad_tarde_vacia: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de la avena por la tarde cuando está vacia es obligatoria.' ]
    },

    avena_cantidad_tarde_gestante: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de la avena por la tarde cuando está gestante es obligatoria.' ]
    },

    avena_cantidad_tarde_cria: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de la avena por la tarde cuando tiene cría es obligatoria.' ]
    },

    // * * * * * * * * * * A L F A L F A * * * * * * * * * *

    alfalfa_manana: {
        type: String,
        default: 'ALFALFA MAÑANA',
        required: [ true, 'La alfalfa por la mañana es obligatoria.' ]
    },

    alfalfa_cantidad_manana_vacia: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de la alfalfa por la mañana cuando está vacia es obligatoria.' ]
    },

    alfalfa_cantidad_manana_gestante: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de la alfalfa por la mañana cuando está gestante es obligatoria.' ]
    },

    alfalfa_cantidad_manana_cria: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de la alfalfa por la mañana cuando tiene cría es obligatoria.' ]
    },

    alfalfa_tarde: {
        type: String,
        default: 'ALFALFA TARDE',
        required: [ true, 'La alfalfa por la tarde es obligatoria.' ]
    },

    alfalfa_cantidad_tarde_vacia: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de la alfalfa por la tarde cuando está vacia es obligatoria.' ]
    },

    alfalfa_cantidad_tarde_gestante: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de la alfalfa por la tarde cuando está gestante es obligatoria.' ]
    },

    alfalfa_cantidad_tarde_cria: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de la alfalfa por la tarde cuando tiene cría es obligatoria.' ]
    },

    // * * * * * * * * * * G R A N O * * * * * * * * * *

    grano_manana: {
        type: String,
        default: 'GRANO MAÑANA',
        required: [ true, 'El grano por la mañana es obligatorio.' ]
    },

    grano_cantidad_manana_vacia: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de grano por la mañana cuando está vacia es obligatoria.' ]
    },

    grano_cantidad_manana_gestante: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de grano por la mañana cuando está gestante es obligatoria.' ]
    },

    grano_cantidad_manana_cria: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de grano por la mañana cuando tiene cría es obligatoria.' ]
    },

    grano_tarde: {
        type: String,
        default: 'GRANO TARDE',
        required: [ true, 'La alfalfa por la tarde es obligatoria.' ]
    },

    grano_cantidad_tarde_vacia: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de grano por la tarde cuando está vacia es obligatoria.' ]
    },

    grano_cantidad_tarde_gestante: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de grano por la tarde cuando está gestante es obligatoria.' ]
    },

    grano_cantidad_tarde_cria: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de grano por la tarde cuando tiene cría es obligatoria.' ]
    },

    // * * * * * * * * * * A C E I T E * * * * * * * * * *

    aceite_manana: {
        type: String,
        default: 'ACEITE MAÑANA',
        required: [ true, 'El grano por la mañana es obligatorio.' ]
    },

    aceite_cantidad_manana_vacia: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de aceite por la mañana cuando está vacia es obligatoria.' ]
    },

    aceite_cantidad_manana_gestante: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de aceite por la mañana cuando está gestante es obligatoria.' ]
    },

    aceite_cantidad_manana_cria: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de aceite por la mañana cuando tiene cría es obligatoria.' ]
    },

    aceite_tarde: {
        type: String,
        default: 'ACEITE TARDE',
        required: [ true, 'La alfalfa por la tarde es obligatoria.' ]
    },

    aceite_cantidad_tarde_vacia: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de aceite por la tarde cuando está vacia es obligatoria.' ]
    },

    aceite_cantidad_tarde_gestante: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de aceite por la tarde cuando está gestante es obligatoria.' ]
    },

    aceite_cantidad_tarde_cria: {
        type: String,
        default: '0',
        required: [ true, 'La cantidad de aceite por la tarde cuando tiene cría es obligatoria.' ]
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

DietaYeguaSchema.methods.toJSON = function () {
    
    const { _id, ...dietaYegua } = this.toObject();
    dietaYegua.idDieta = _id;
    return dietaYegua;
}

module.exports = model( 'dieta_yegua', DietaYeguaSchema );