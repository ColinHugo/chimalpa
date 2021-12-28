const { Conejo, HistorialReproductivoConejo } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerHistorialReproductivoConejos = async ( req, res ) => {

    try {

        const historialReproductivo = await HistorialReproductivoConejo.find()
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

    const { idConejo } = req.params;

    try {

        const historial = await HistorialReproductivoConejo.where( { conejo: idConejo } )
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
    const { idConejo } = req.params;

    try {

        const conejo = await Conejo.findById( idConejo );

        req.body.conejo = conejo;

        const historialReproductivoConejo = await HistorialReproductivoConejo( req.body )
            .populate( 'conejo', 'numeroConejo' );

        await historialReproductivoConejo.save();

        generarControl( nombre, apellidos, 'registrado un historial reproductivo al conejo número', conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'El historial reproductivo del conejo se ha registrado.',
            historialReproductivoConejo
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

        const historial = await HistorialReproductivoConejo.findByIdAndUpdate( idHistorialReproductivo, datos, { new: true } )
            .populate( 'conejo', 'numeroConejo' );

        const conejo = await Conejo.findById( historial.conejo );

        generarControl( nombre, apellidos, 'actualizado un historial reproductivo al conejo número', conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'El historial reproductivo del conejo se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el historial reproductivo del conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el historial reproductivo del conejo.'
        } );
    }
}

module.exports = {
    obtenerHistorialReproductivoConejos,
    obtenerHistorialReproductivoConejoById,
    registrarHistorialReproductivoConejo,
    actualizarHistorialReproductivoConejo
}