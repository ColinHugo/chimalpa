const { HistorialReproductivoAve, Ave } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerHistorialReproductivoAves = async ( req, res ) => {

    try {

        const historialReproductivo = await HistorialReproductivoAve.find()
            .populate( 'ave', 'numeroAve' );

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

        console.error( 'Error al obtener los historiales reproductivos de las aves.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener los historiales reproductivos de las aves.'
        } );
    }
}

const obtenerHistorialReproductivoAveById = async ( req, res ) => {

    const { idAve } = req.params;

    try {

        const historial = await HistorialReproductivoAve.where( { ave: idAve } )
            .populate( 'ave', 'numeroAve' );

        if ( historial.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historial para la ave.'
            } );
        }

        return res.json( {
            value: 1,
            historial
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener el historial reproductivo del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener el historial reproductivo del ave.'
        } );
    }
}

const registrarHistorialReproductivoAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idAve } = req.params;

    try {

        const ave = await Ave.findById( idAve );

        req.body.ave = ave;

        const historialReproductivoAve = await HistorialReproductivoAve( req.body )
            .populate( 'ave', 'numeroAve' );

        await historialReproductivoAve.save();

        generarControl( nombre, apellidos, 'registrado un historial reproductivo al ave número', ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'El historial reproductivo del ave se ha registrado.',
            historialReproductivoAve
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el historial reproductivo del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar el historial reproductivo del ave.'
        } );
    }
}

const actualizarHistorialReproductivoAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorialReproductivo } = req.params;
    const { ...datos} = req.body;

    try {

        const historial = await HistorialReproductivoAve.findByIdAndUpdate( idHistorialReproductivo, datos, { new: true } )
            .populate( 'ave', 'numeroAve' );

        const ave = await Ave.findById( historial.ave );

        generarControl( nombre, apellidos, 'actualizado un historial reproductivo al ave número', ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'El historial reproductivo del ave se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el historial reproductivo del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el historial reproductivo del ave.'
        } );
    }
}

module.exports = {
    obtenerHistorialReproductivoAves,
    obtenerHistorialReproductivoAveById,
    registrarHistorialReproductivoAve,
    actualizarHistorialReproductivoAve
}