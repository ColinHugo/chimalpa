const { MontaCaballo, HistorialReproductivoCaballo } = require( '../models' );

const { generarControl } = require( '../helpers' );

const obtenerMontaCaballoById = async ( req, res ) => {

    const { idHistorialReproductivo } = req.params;

    try {

        const monta = await MontaCaballo.where( { historialReproductivoCaballo: idHistorialReproductivo } )
            .populate( 'yegua', 'nombre' )
            .populate( 'semental', 'nombre' )
            .populate( 'encargado', [ 'nombre', 'apellidos'] );

        if ( monta.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay montas programadas registradas.'
            } )
        }

        return res.json( {
            value: 1,
            monta
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las montas.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las montas.'
        } );
    }
}

const registrarMontaCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    
    const { idHistorialReproductivo, idEncargado } = req.params;

    try {

        const historialReproductivo = await HistorialReproductivoCaballo.findById( idHistorialReproductivo )
            .populate( 'yegua', 'nombre' )
            .populate( 'semental', 'nombre' );

        const { yegua, semental } = historialReproductivo;

        req.body.yegua = yegua;
        req.body.semental = semental;
        req.body.encargado = idEncargado;
        req.body.historialReproductivoCaballo = idHistorialReproductivo;
            
        const monta = new MontaCaballo( req.body );

        await monta.save();

        generarControl( nombre, apellidos, 'registrado una monta a la yegua', historialReproductivo.yegua.nombre );

        return res.json( {
            value: 1,
            msg: 'La monta se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la monta.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la monta.'
        } );
    }
}

const actualizarMontaCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idMonta } = req.params;
    const { ...datos } = req.body;

    try {

        const monta = await MontaCaballo.findByIdAndUpdate( idMonta, datos )
            .populate( 'yegua', 'nombre' );

        generarControl( nombre, apellidos, 'actualizado una monta a la yegua', monta.yegua.nombre );

        return res.json( {
            value: 1,
            msg: 'La monta se ha actualizado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la monta.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la monta.'
        } );
    }
}

const eliminarMontaCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idMonta } = req.params;

    try {

        const tratamiento = await MontaCaballo.findByIdAndDelete( idMonta )
            .populate( 'yegua', 'nombre' );

        generarControl( nombre, apellidos, 'eliminado una monta a la yegua', tratamiento.yegua.nombre );
        
        return res.json( {
            value: 1,
            msg: 'La monta se ha eliminado.',
        } );

    } catch ( error ) {

        console.error( 'Error al eliminar la monta.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la monta.'
        } );
    }
}

module.exports = {
    obtenerMontaCaballoById,
    registrarMontaCaballo,
    actualizarMontaCaballo,
    eliminarMontaCaballo
}