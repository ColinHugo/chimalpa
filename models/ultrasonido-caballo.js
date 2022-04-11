const { Schema, model } = require( 'mongoose' );

const UltrasonidoSchema = Schema( {

    fotoOvarioDerecho: {
        type: String
    },

    fotoOvarioIzquierdo: {
        type: String
    },

    fotoUltraSonido: {
        type: String
    },

    descripcion: {
        type: String
    },

    diagnostico: {
        type: String,
        required: [ true, 'El ultrasonido de la yegua es obligatorio.' ]
    },

    monta: {
        type: Schema.Types.ObjectId,
        ref: 'monta_caballo'
    }

}, {
    versionKey: false,
    timestamps: true
} );

UltrasonidoSchema.methods.toJSON = function () {
    const { _id, ...ultrasonido } = this.toObject();
    ultrasonido.idUltrasonido = _id;
    return ultrasonido;
}

module.exports = model( 'ultrasonido_caballo', UltrasonidoSchema );