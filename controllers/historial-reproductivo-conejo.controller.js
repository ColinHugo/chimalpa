const { HistorialReproductivoConejo } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerHistorialReproductivoConejos = async ( req, res ) => {

    try {

        const historialReproductivo = await HistorialReproductivoConejo.find()
            .populate( 'coneja', 'numeroConejo' )
            .populate( 'conejo', 'numeroConejo' );

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

        console.error( 'Error al obtener los historiales reproductivos de los conejos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener los historiales reproductivos de los conejos.'
        } );
    }
}

const obtenerHistorialReproductivoConejoById = async ( req, res ) => {

    const { idConeja } = req.params;

    try {

        const historial = await HistorialReproductivoConejo.where( { coneja: idConeja } )
            .populate( 'coneja', 'numeroConejo' )
            .populate( 'conejo', 'numeroConejo' );

        if ( historial.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historial para el conejo.'
            } );
        }

        return res.json( {
            value: 1,
            historial
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener el historial reproductivo del conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener el historial reproductivo del conejo.'
        } );
    }
}

const registrarHistorialReproductivoConejo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idConeja, idConejo } = req.params;

    try {

        req.body.coneja = idConeja;
        req.body.conejo = idConejo;

        const historialReproductivoConejo = await new HistorialReproductivoConejo( req.body )
            .populate( 'coneja', 'numeroConejo' );

        await historialReproductivoConejo.save();

        generarControl( nombre, apellidos, 'registrado un historial reproductivo a la coneja número', 
                        historialReproductivoConejo.coneja.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'El historial reproductivo del conejo se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el historial reproductivo del conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar el historial reproductivo del conejo.'
        } );
    }
}

const actualizarHistorialReproductivoConejo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorialReproductivo } = req.params;
    const { ...datos} = req.body;

    try {

        const historial = await HistorialReproductivoConejo.findByIdAndUpdate( idHistorialReproductivo, datos )
            .populate( 'coneja', 'numeroConejo' );

        generarControl( nombre, apellidos, 'actualizado un historial reproductivo a la coneja número', 
                        historial.coneja.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'El historial reproductivo de la coneja se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el historial reproductivo de la coneja.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el historial reproductivo de la coneja.'
        } );
    }
}

const eliminarHistorialReproductivoConejo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorialReproductivo } = req.params;

    try {

        const historial = await HistorialReproductivoConejo.findByIdAndDelete( idHistorialReproductivo )
            .populate( 'coneja', 'numeroConejo' );

        generarControl( nombre, apellidos, 'eliminado un historial reproductivo a la coneja número', 
                        historial.coneja.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'El historial reproductivo de la coneja se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el historial reproductivo de la coneja.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el historial reproductivo de la coneja.'
        } );
    }
}

module.exports = {
    obtenerHistorialReproductivoConejos,
    obtenerHistorialReproductivoConejoById,
    registrarHistorialReproductivoConejo,
    actualizarHistorialReproductivoConejo,
    eliminarHistorialReproductivoConejo
}