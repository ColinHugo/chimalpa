const { MedicinaPreventiva } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerMedicinaPreventiva = async ( req, res ) => {

    try {

        const medicinas = await MedicinaPreventiva.find()
            .populate( 'caballo', 'nombre' );

        if ( medicinas.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay caballos registrados.'
            } );
        }

        return res.json( {
            value: 1,
            medicinas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener a los caballos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener a los caballos.'
        } );
    }
}

const obtenerMedicinaPreventivaById = async ( req, res ) => {

    const { idCaballo } = req.params;

    try {

        const medicina = await MedicinaPreventiva.where( { caballo: idCaballo } )
            .populate( 'caballo', 'nombre' );

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

const registrarMedicinaPreventiva = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCaballo } = req.params;

    try {

        req.body.caballo = idCaballo;

        const medicina = await MedicinaPreventiva( req.body )
            .populate( 'caballo', 'nombre' );

        await medicina.save();

        generarControl( nombre, apellidos, 'registrado una medicina preventiva al caballo', medicina.caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'La medicina preventiva se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la medicina preventiva.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la medicina preventiva.'
        } );
    }
}

const actualizarMedicinaPreventiva = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idMedicina } = req.params;
    const { ...datos } = req.body;

    try {

        const medicina = await MedicinaPreventiva.findByIdAndUpdate( idMedicina, datos )
            .populate( 'caballo', 'nombre' );

        generarControl( nombre, apellidos, 'actualizado una medicina preventiva al caballo', medicina.caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'La medicina preventiva se ha actualizado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la medicina preventiva.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la medicina preventiva.'
        } );
    }
}

const eliminarMedicinaPreventiva = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idMedicina } = req.params;

    try {

        const medicina = await MedicinaPreventiva.findByIdAndDelete( idMedicina )
            .populate( 'caballo', 'nombre' );

        generarControl( nombre, apellidos, 'eliminado una medicina preventiva al caballo', medicina.caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'La medicina preventiva se ha eliminado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la medicina preventiva.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la medicina preventiva.'
        } );
    }
}

module.exports = {
    obtenerMedicinaPreventiva,
    obtenerMedicinaPreventivaById,
    registrarMedicinaPreventiva,
    actualizarMedicinaPreventiva,
    eliminarMedicinaPreventiva
}