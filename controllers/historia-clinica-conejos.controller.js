const { HistoriaClinicaConejo } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerHistoriaClinicaConejos = async ( req, res ) => {

    try {

        const historiaConejos = await HistoriaClinicaConejo.find()
            .populate( 'conejo', 'numeroConejo' );

        if ( historiaConejos.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historiales clínicos de conejos que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            historiaConejos
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la historia de los conejos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la historia de los conejos.'
        } );
    }
}

const obtenerHistoriaClinicaConejoById = async ( req, res ) => {

    const { idConejo } = req.params;

    try {

        const historiaConejo = await HistoriaClinicaConejo.where( { conejo: idConejo } )
            .populate( 'conejo', 'numeroConejo' );

        if ( historiaConejo.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historia para el conejo.'
            } );
        }

        return res.json( {
            value: 1,
            historiaConejo
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la historia del conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la historia del conejo.'
        } );
    }
}

const registrarHistoriaClinicaConejo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idConejo } = req.params;

    try {

        req.body.conejo = idConejo;

        const historiaConejo = await HistoriaClinicaConejo( req.body )
            .populate( 'conejo', 'numeroConejo' );
            
        await historiaConejo.save();

        generarControl( nombre, apellidos, 'registrado un historial clínico al conejo número',
                        historiaConejo.conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'La historia del conejo se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la historia del conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la historia del conejo.'
        } );
    }
}

const actualizarHistoriaClinicaConejo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorial } = req.params;
    const { ...datos} = req.body;

    try {

        const historiaConejo = await HistoriaClinicaConejo.findByIdAndUpdate( idHistorial, datos )
            .populate( 'conejo', 'numeroConejo' );

        generarControl( nombre, apellidos, 'actualizado un historial clínico al conejo número',
                        historiaConejo.conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'El historial clínico del conejo se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el historial clínico del conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el historial clínico del conejo.'
        } );
    }
}

const eliminarHistoriaClinicaConejo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorial } = req.params;

    try {

        const historiaConejo = await HistoriaClinicaConejo.findByIdAndDelete( idHistorial )
            .populate( 'conejo', 'numeroConejo' );

        generarControl( nombre, apellidos, 'eliminado un historial clínico al conejo número',
                        historiaConejo.conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'El historial clínico del conejo se ha eliminado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar el historial clínico del conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar el historial clínico del conejo.'
        } );
    }
}

module.exports = {
    obtenerHistoriaClinicaConejos,
    obtenerHistoriaClinicaConejoById,
    registrarHistoriaClinicaConejo,
    actualizarHistoriaClinicaConejo,
    eliminarHistoriaClinicaConejo
}