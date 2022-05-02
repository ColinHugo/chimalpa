const { HistoriaClinica } = require( '../models' );

const { generarControl } = require( '../helpers' );

const obtenerHistoriaClinicaCaballos = async ( req, res ) => {

    try {

        const historiaCaballo = await HistoriaClinica.find()
            .populate( 'caballo', 'nombre' );

        if ( historiaCaballo.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historia que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            historiaCaballo
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la historia de los caballos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la historia de los caballos.'
        } );
    }
}

const obtenerHistoriaClinicaCaballoById = async ( req, res ) => {

    const { idCaballo } = req.params;

    try {

        const historiaCaballo = await HistoriaClinica.where( { caballo: idCaballo } )
            .populate( 'caballo', 'nombre' );

        if ( historiaCaballo.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historia para el caballo.'
            } );
        }

        return res.json( {
            value: 1,
            historiaCaballo
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la historia del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la historia del caballo.'
        } );
    }
}

const registrarHistoriaClinicaCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCaballo } = req.params;

    try {

        req.body.caballo = idCaballo;

        const historiaCaballo = await HistoriaClinica( req.body )
            .populate( 'caballo', 'nombre' );
            
        await historiaCaballo.save();

        generarControl( nombre, apellidos, 'registrado un historial clínico al caballo', historiaCaballo.caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'La historia del caballo se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la historia del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la historia del caballo.'
        } );
    }
}

const actualizarHistoriaClinicaCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorial } = req.params;
    const { ...datos} = req.body;

    try {

        const historiaCaballo = await HistoriaClinica.findByIdAndUpdate( idHistorial, datos )
            .populate( 'caballo', 'nombre' );

        generarControl( nombre, apellidos, 'actualizado un historial clínico al caballo', 
                        historiaCaballo.caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El historial del caballo se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el historial del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el historial del caballo.'
        } );
    }
}

const eliminarHistoriaClinicaCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorial } = req.params;

    try {

        const historiaCaballo = await HistoriaClinica.findByIdAndDelete( idHistorial )
            .populate( 'caballo', 'nombre' );

        generarControl( nombre, apellidos, 'eliminado un historial clínico al caballo', historiaCaballo.caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El historial del caballo se ha eliminado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar el historial del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar el historial del caballo.'
        } );
    }
}

module.exports = {
    obtenerHistoriaClinicaCaballos,
    obtenerHistoriaClinicaCaballoById,
    registrarHistoriaClinicaCaballo,
    actualizarHistoriaClinicaCaballo,
    eliminarHistoriaClinicaCaballo
}