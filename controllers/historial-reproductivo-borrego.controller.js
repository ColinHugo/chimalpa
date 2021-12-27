const { HistorialReproductivoBorrego, Borrego } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerHistorialReproductivoBorregos = async ( req, res ) => {

    try {

        const historialReproductivo = await HistorialReproductivoBorrego.find()
            .populate( 'borrego', 'numeroBorrego' );

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

        console.error( 'Error al obtener los historiales reproductivos de los borregos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener los historiales reproductivos de los borregos.'
        } );
    }
}

const obtenerHistorialReproductivoBorregoById = async ( req, res ) => {

    const { idBorrego } = req.params;

    try {

        const historial = await HistorialReproductivoBorrego.where( { borrego: idBorrego } )
            .populate( 'borrego', 'numeroBorrego' );

        if ( historial.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historial para el borrego.'
            } );
        }

        return res.json( {
            value: 1,
            historial
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener el historial reproductivo del borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener el historial reproductivo del borrego.'
        } );
    }
}

const registrarHistorialReproductivoBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idBorrego } = req.params;

    try {

        const borrego = await Borrego.findById( idBorrego );

        req.body.borrego = borrego;

        const historialReproductivoBorrego = await HistorialReproductivoBorrego( req.body )
            .populate( 'borrego', 'numeroBorrego' );

        await historialReproductivoBorrego.save();

        generarControl( nombre, apellidos, 'registrado un historial reproductivo al borrego número', borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'El historial reproductivo del borrego se ha registrado.',
            historialReproductivoBorrego
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el historial reproductivo del borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar el historial reproductivo del borrego.'
        } );
    }
}

const actualizarHistorialReproductivoBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorialReproductivo } = req.params;
    const { ...datos} = req.body;

    try {

        const historial = await HistorialReproductivoBorrego.findByIdAndUpdate( idHistorialReproductivo, datos, { new: true } )
            .populate( 'borrego', 'numeroBorrego' );

        const borrego = await Borrego.findById( historial.borrego );

        generarControl( nombre, apellidos, 'actualizado un historial reproductivo al borrego número', borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'El historial reproductivo del borrego se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el historial reproductivo del borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el historial reproductivo del borrego.'
        } );
    }
}

module.exports = {
    obtenerHistorialReproductivoBorregos,
    obtenerHistorialReproductivoBorregoById,
    registrarHistorialReproductivoBorrego,
    actualizarHistorialReproductivoBorrego
}