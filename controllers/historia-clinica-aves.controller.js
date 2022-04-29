const { HistoriaClinicaAve, Ave } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerHistoriaClinicaAves = async ( req, res ) => {

    try {

        const historiaAves = await HistoriaClinicaAve.find()
            .populate( 'ave', 'numeroAve' );

        if ( historiaAves.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historia que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            historiaAves
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la historia de las aves.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la historia de las aves.'
        } );
    }
}

const obtenerHistoriaClinicaAveById = async ( req, res ) => {

    const { idAve } = req.params;

    try {

        const historiaAve = await HistoriaClinicaAve.where( { ave: idAve } )
            .populate( 'ave', 'numeroAve' );

        if ( historiaAve.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historia para el ave.'
            } );
        }

        return res.json( {
            value: 1,
            historiaAve
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la historia del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la historia del ave.'
        } );
    }
}

const registrarHistoriaClinicaAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idAve } = req.params;

    try {

        req.body.ave = idAve;

        const historiaAve = await HistoriaClinicaAve( req.body )
            .populate( 'ave', 'numeroAve' );
            
        await historiaAve.save();

        generarControl( nombre, apellidos, 'registrado un historial clínico al ave', historiaAve.ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'La historia del ave se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la historia del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la historia del ave.'
        } );
    }
}

const actualizarHistoriaClinicaAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorial } = req.params;
    const { ...datos} = req.body;

    try {

        const historiaAve = await HistoriaClinicaAve.findByIdAndUpdate( idHistorial, datos )
            .populate( 'ave', 'numeroAve' );

        const ave = await Ave.findById( historiaAve.ave );

        generarControl( nombre, apellidos, 'actualizado un historial clínico al ave', ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'El historial del ave se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el historial del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el historial del ave.'
        } );
    }
}

const eliminarHistoriaClinicaAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorial } = req.params;

    try {

        const historiaAve = await HistoriaClinicaAve.findByIdAndDelete( idHistorial )
            .populate( 'ave', 'numeroAve' );

        generarControl( nombre, apellidos, 'eliminado un historial clínico al ave', historiaAve.ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'El historial del ave se ha eliminado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar el historial del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar el historial del ave.'
        } );
    }
}

module.exports = {
    obtenerHistoriaClinicaAves,
    obtenerHistoriaClinicaAveById,
    registrarHistoriaClinicaAve,
    actualizarHistoriaClinicaAve,
    eliminarHistoriaClinicaAve
}