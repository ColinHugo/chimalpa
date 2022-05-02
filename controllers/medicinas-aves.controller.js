const { MedicinaAve } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerMedicinaAve = async ( req, res ) => {

    try {

        const medicinas = await MedicinaAve.find()
            .populate( 'ave', 'numeroAve' );

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

        console.error( 'Error al obtener las medicinas de las aves.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las medicinas de las aves.'
        } );
    }
}

const obtenerMedicinaAveById = async ( req, res ) => {

    const { idAve } = req.params;

    try {

        const medicina = await MedicinaAve.where( { ave: idAve } )
            .populate( 'ave', 'numeroAve' );

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

const registrarMedicinaAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idAve } = req.params;

    try {

        req.body.ave = idAve;

        const medicina = await MedicinaAve( req.body )
            .populate( 'ave', 'numeroAve' );

        await medicina.save();

        generarControl( nombre, apellidos, 'registrado una medicina al ave número', medicina.ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'La medicina del ave se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la medicina del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la medicina del ave.'
        } );
    }
}

const actualizarMedicinaAve = async ( req, res ) => {
    
    const { nombre, apellidos } = req.body.usuario;

    const { idMedicina } = req.params;
    const { ...datos } = req.body;

    try {

        const medicina = await MedicinaAve.findByIdAndUpdate( idMedicina, datos )
            .populate( 'ave', 'numeroAve' );

        generarControl( nombre, apellidos, 'actualizado una medicina al ave número', medicina.ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'La medicina del ave se ha actualizado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la medicina del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la medicina del ave.'
        } );
    }
}

const eliminarMedicinaAve = async ( req, res ) => {
    
    const { nombre, apellidos } = req.body.usuario;
    const { idMedicina } = req.params;

    try {

        const medicina = await MedicinaAve.findByIdAndDelete( idMedicina )
            .populate( 'ave', 'numeroAve' );

        generarControl( nombre, apellidos, 'eliminado una medicina al ave número', medicina.ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'La medicina del ave se ha eliminado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la medicina del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la medicina del ave.'
        } );
    }
}

module.exports = {
    obtenerMedicinaAve,
    obtenerMedicinaAveById,
    registrarMedicinaAve,
    actualizarMedicinaAve,
    eliminarMedicinaAve
}