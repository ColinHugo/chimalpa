const { HistorialReproductivoCaballo } = require( '../models' );

const { generarControl } = require( '../helpers' );

const obtenerHistorialReproductivoCaballos = async ( req, res ) => {

    try {

        const historialReproductivo = await HistorialReproductivoCaballo.find()
            .populate( 'yegua', 'nombre' )
            .populate( 'semental', 'nombre' )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

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

    const { idYegua } = req.params;

    try {

        const historial = await HistorialReproductivoCaballo.where( { yegua: idYegua } )
            .populate( 'yegua', 'nombre' )
            .populate( 'semental', 'nombre' )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

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
    const { idYegua, idSemental } = req.params;

    try {

        req.body.yegua = idYegua;
        req.body.semental = idSemental;

        const historialReproductivoCaballo = await new HistorialReproductivoCaballo( req.body )
            .populate( 'yegua', 'nombre' );

        await historialReproductivoCaballo.save();

        generarControl( nombre, apellidos, 'registrado un historial reproductivo a la yegua', 
                        historialReproductivoCaballo.yegua.nombre );

        return res.json( {
            value: 1,
            msg: 'El historial reproductivo de la yegua se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el historial reproductivo de la yegua.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar el historial reproductivo de la yegua.'
        } );
    }
}

const actualizarHistorialReproductivoCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorialReproductivo } = req.params;
    const { ...datos} = req.body;

    try {

        const historial = await HistorialReproductivoCaballo.findByIdAndUpdate( idHistorialReproductivo, datos )
            .populate( 'yegua', 'nombre' );

        generarControl( nombre, apellidos, 'actualizado un historial reproductivo a la yegua', historial.yegua.nombre );

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

const eliminarHistorialReproductivoCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorialReproductivo } = req.params;

    try {

        const historial = await HistorialReproductivoCaballo.findByIdAndDelete( idHistorialReproductivo )
            .populate( 'yegua', 'nombre' );

        generarControl( nombre, apellidos, 'eliminado un historial reproductivo a la yegua', historial.yegua.nombre );

        return res.json( {
            value: 1,
            msg: 'El historial reproductivo del caballo se ha eliminado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar el historial reproductivo del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar el historial reproductivo del caballo.'
        } );
    }
}

module.exports = {
    obtenerHistorialReproductivoCaballos,
    obtenerHistorialReproductivoCaballoById,
    registrarHistorialReproductivoCaballo,
    actualizarHistorialReproductivoCaballo,
    eliminarHistorialReproductivoCaballo
}