const { MedicinaConejo } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerMedicinaConejo = async ( req, res ) => {

    try {

        const medicinas = await MedicinaConejo.find()
            .populate( 'conejo', 'numeroConejo' );

        if ( medicinas.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay medicinas registradas.'
            } );
        }

        return res.json( {
            value: 1,
            medicinas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las medicinas de los conejos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las medicinas de los conejos.'
        } );
    }
}

const obtenerMedicinaConejoById = async ( req, res ) => {

    const { idConejo } = req.params;

    try {

        const medicina = await MedicinaConejo.where( { conejo: idConejo } )
            .populate( 'conejo', 'numeroConejo' );

        if ( medicina.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay medicinas registradas.'
            } );
        }

        return res.json( {
            value: 1,
            medicina
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la medicina preventiva.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la medicina preventiva.'
        } );
    }
}

const registrarMedicinaConejo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idConejo } = req.params;

    try {

        req.body.conejo = idConejo;

        const medicina = await MedicinaConejo( req.body )
            .populate( 'conejo', 'numeroConejo' );

        await medicina.save();

        generarControl( nombre, apellidos, 'registrado una medicina al conejo número', medicina.conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'La medicina del conejo se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la medicina del conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la medicina del conejo.'
        } );
    }
}

const actualizarMedicinaConejo = async ( req, res ) => {
    
    const { nombre, apellidos } = req.body.usuario;

    const { idMedicina } = req.params;
    const { ...datos } = req.body;

    try {

        const medicina = await MedicinaConejo.findByIdAndUpdate( idMedicina, datos )
            .populate( 'conejo', 'numeroConejo' );

        generarControl( nombre, apellidos, 'actualizado una medicina al conejo número', medicina.conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'La medicina del conejo se ha actualizado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la medicina del conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la medicina del conejo.'
        } );
    }
}

const eliminarMedicinaConejo = async ( req, res ) => {
    
    const { nombre, apellidos } = req.body.usuario;
    const { idMedicina } = req.params;

    try {

        const medicina = await MedicinaConejo.findByIdAndDelete( idMedicina )
            .populate( 'conejo', 'numeroConejo' );

        generarControl( nombre, apellidos, 'eliminado una medicina al conejo número', medicina.conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'La medicina del conejo se ha eliminado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la medicina del conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la medicina del conejo.'
        } );
    }
}

module.exports = {
    obtenerMedicinaConejo,
    obtenerMedicinaConejoById,
    registrarMedicinaConejo,
    actualizarMedicinaConejo,
    eliminarMedicinaConejo
}