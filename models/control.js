const { Schema, model } = require( 'mongoose' );

const ControlSchema = Schema( {

    mensaje: {
        type: String,
    }

}, {
    versionKey: false,
    timestamps: true
} );

module.exports = model( 'Control', ControlSchema );