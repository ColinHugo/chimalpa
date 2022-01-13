const { Alerta, Caballo } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerAlertas = async ( req, res ) => {

    try {

        const alertas = await Alerta.where()
            .populate( 'caballo', 'nombre' )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        return res.json( {
            value: 1,
            alertas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las alertas.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las alertas.'
        } );
    }
}

const registrarAlerta = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCaballo } = req.params;

    try {

        const caballo = await Caballo.findById( idCaballo );

        req.body.caballo = caballo;

        const alerta = new Alerta( req.body );

        await alerta.save();

        generarControl( nombre, apellidos, 'registrado la alerta', alerta.descripcion );

        return res.json( {
            value: 1,
            msg: 'La alerta se ha registrado.',
            alerta,
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la alerta.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la alerta.'
        } );
    }
}

const actualizarAlerta = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idAlerta } = req.params;
    const { ...datos } = req.body;

    try {

        const alerta = await Alerta.findByIdAndUpdate( idAlerta, datos, { new: true } )
            .populate( 'caballo', 'nombre' )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

            generarControl( nombre, apellidos, 'actualizado la alerta', alerta.descripcion );

        return res.json( {
            value: 1,
            msg: 'La alerta se ha actualizado.',
            alerta
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el ave.'
        } );
    }
}

const eliminarAlerta = async ( req, res ) => {

    const { idAlerta } = req.params;

    const { nombre, apellidos } = req.body.usuario;

    try {

        const alerta = await Alerta.findByIdAndDelete( idAlerta )

        generarControl( nombre, apellidos, 'eliminado la alerta', alerta.descripcion );

        return res.json( {
            value: 1,
            msg: 'La alerta se ha eliminado.',
            alerta
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la alerta.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la alerta.'
        } );
    }
}

module.exports = {
    obtenerAlertas,
    registrarAlerta,
    actualizarAlerta,
    eliminarAlerta
}