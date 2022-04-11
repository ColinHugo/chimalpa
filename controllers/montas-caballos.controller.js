const { Caballo, ProgramarMontaCaballo, HistorialReproductivo } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerMontaCaballoById = async ( req, res ) => {

    const { idCaballo, idHistorialReproductivo } = req.params;

    try {

        const monta = await ProgramarMontaCaballo.where( {
            caballo: idCaballo,
            historialReproductivo: idHistorialReproductivo
        } )
            .populate( 'usuario', [ 'nombre', 'apellidos'] )
            .populate( 'caballo', 'nombre' );

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
    const { idCaballo, idHistorialReproductivo } = req.params;

    try {

        const [ caballo, historialReproductivo ] = await Promise.all( [
            Caballo.findById( idCaballo ),
            HistorialReproductivo.findById( idHistorialReproductivo )
        ] );

        req.body.caballo = caballo;
        req.body.historialReproductivo = historialReproductivo;

        const monta = new ProgramarMontaCaballo( req.body );

        await monta.save();

        generarControl( nombre, apellidos, 'registrado una monta a la yegua', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'La monta se ha registrado.',
            tratamiento: monta
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

        const monta = await ProgramarMontaCaballo.findByIdAndUpdate( idMonta, datos, { new: true } )
            .populate( 'caballo', 'nombre' );

        const caballo = await Caballo.findById( monta.caballo );

        generarControl( nombre, apellidos, 'actualizado una monta a la yegua', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'La monta se ha actualizado.',
            medicina: monta
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

        const tratamiento = await ProgramarMontaCaballo.findByIdAndDelete( idMonta );

        const caballo = await Caballo.findById( tratamiento.caballo );

        generarControl( nombre, apellidos, 'eliminado una monta a la yegus', caballo.nombre );
        
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