const { Capacitacion } = require( '../models' );

const { generarControl } = require( '../helpers' );

const obtenerCapacitaciones = async ( req, res ) => {

    try {

        const capacitaciones = await Capacitacion.find(  )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        if ( capacitaciones.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay capacitaciones registradas.'
            } );
        }

        return res.json( {
            value: 1,
            capacitaciones
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las capacitaciones.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las capacitaciones.'
        } );
    }
}

const registrarCapacitacion = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    try {

        const capacitacion = new Capacitacion( req.body );

        await capacitacion.save();

        generarControl( nombre, apellidos, 'registrado la capacitación', capacitacion.descripcion );

        return res.json( {
            value: 1,
            msg: 'La capacitacion se ha registrado.',
            capacitacion,
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la capacitacion.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la capacitacion.'
        } );
    }
}

const actualizarCapacitacion = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idCapacitacion } = req.params;
    const { ...datos } = req.body;

    try {

        const capacitacion = await Capacitacion.findByIdAndUpdate( idCapacitacion, datos, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

            generarControl( nombre, apellidos, 'actualizado la capacitación', capacitacion.descripcion );

        return res.json( {
            value: 1,
            msg: 'La capacitación se ha actualizado.',
            capacitacion
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la capacitación.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la capacitación.'
        } );
    }
}

const eliminarCapacitacion = async ( req, res ) => {

    const { idCapacitacion } = req.params;

    const { nombre, apellidos } = req.body.usuario;

    try {

        const capacitacion = await Capacitacion.findByIdAndDelete( idCapacitacion );

        generarControl( nombre, apellidos, 'eliminado la capacitación', capacitacion.descripcion );

        return res.json( {
            value: 1,
            msg: 'La capacitación se ha eliminado.',
            capacitacion
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la capacitación.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la capacitación.'
        } );
    }
}

module.exports = {
    obtenerCapacitaciones,
    registrarCapacitacion,
    actualizarCapacitacion,
    eliminarCapacitacion
}