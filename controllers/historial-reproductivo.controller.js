const { HistorialReproductivo, Caballo } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerHistorialReproductivoCaballos = async ( req, res ) => {

    try {

        const historialReproductivo = await HistorialReproductivo.find()
            .populate( 'caballo', 'nombre' );

        if ( historialReproductivo.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historial reproductivo que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            historialReproductivo
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener los historiales reproductivos de los caballos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener los historiales reproductivos de los caballos.'
        } );
    }
}

const obtenerHistorialReproductivoCaballoById = async ( req, res ) => {

    const { idCaballo } = req.params;

    try {

        const historial = await HistorialReproductivo.where( { caballo: idCaballo } )
            .populate( 'caballo', 'nombre' );

        if ( historial.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historial para el caballo.'
            } );
        }

        return res.json( {
            value: 1,
            historial
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener el historial reproductivo del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener el historial reproductivo del caballo.'
        } );
    }
}

const registrarHistorialReproductivoCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCaballo } = req.params;

    try {

        const caballo = await Caballo.findById( idCaballo );

        req.body.caballo = caballo;

        const historialReproductivoCaballo = await HistorialReproductivo( req.body )
            .populate( 'caballo', 'nombre' );

        await historialReproductivoCaballo.save();

        generarControl( nombre, apellidos, 'registrado un historial reproductivo al caballo', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El historial reproductivo del caballo se ha registrado.',
            historialReproductivoCaballo
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el historial reproductivo del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar el historial reproductivo del caballo.'
        } );
    }
}

const actualizarHistorialReproductivoCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorialReproductivo } = req.params;
    const { ...datos} = req.body;

    try {

        const historial = await HistorialReproductivo.findByIdAndUpdate( idHistorialReproductivo, datos, { new: true } )
            .populate( 'caballo', 'nombre' );

        const caballo = await Caballo.findById( historial.caballo );

        generarControl( nombre, apellidos, 'actualizado un historial reproductivo al caballo', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El historial reproductivo del caballo se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el historial reproductivo del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el historial reproductivo del caballo.'
        } );
    }
}

module.exports = {
    obtenerHistorialReproductivoCaballos,
    obtenerHistorialReproductivoCaballoById,
    registrarHistorialReproductivoCaballo,
    actualizarHistorialReproductivoCaballo
}