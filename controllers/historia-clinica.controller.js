const { HistoriaClinica, Caballo } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

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

        const caballo = await Caballo.findById( idCaballo );

        req.body.caballo = caballo;

        const historiaCaballo = await HistoriaClinica( req.body )
            .populate( 'caballo', 'nombre' );
            
        await historiaCaballo.save();

        generarControl( nombre, apellidos, 'registrado un historial clínico al caballo', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'La historia del caballo se ha registrado.',
            historiaCaballo
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
    const { usuario, ...datos} = req.body;

    try {

        const historiaCaballo = await HistoriaClinica.findByIdAndUpdate( idHistorial, datos, { new: true } )
            .populate( 'caballo', 'nombre' );

        const caballo = await Caballo.findById( historiaCaballo.caballo );

        generarControl( nombre, apellidos, 'actualizado un historial clínico al caballo', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El historial del caballo se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el historial del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el destete del caballo.'
        } );
    }
}

module.exports = {
    obtenerHistoriaClinicaCaballos,
    obtenerHistoriaClinicaCaballoById,
    registrarHistoriaClinicaCaballo,
    actualizarHistoriaClinicaCaballo
}