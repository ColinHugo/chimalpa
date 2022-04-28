const { TrasquilacionBorrego } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerTrasquilacionBorregos = async ( req, res ) => {

    try {

        const trasquilacion = await TrasquilacionBorrego.find()
            .populate( 'borrego', 'numeroBorrego' )
            .populate( 'usuario', [ 'nombre', 'apellidos'] );

        if ( trasquilacion.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay trasquilaciones que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            trasquilacion
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las trasquilaciones de los borregos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las trasquilaciones de los borregos.'
        } );
    }
}

const obtenerTrasquilacionBorregoById = async ( req, res ) => {

    const { idBorrego } = req.params;

    try {

        const trasquilacion = await TrasquilacionBorrego.where( { borrego: idBorrego } )
            .populate( 'borrego', 'numeroBorrego' )
            .populate( 'usuario', [ 'nombre', 'apellidos'] );

        if ( trasquilacion.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay trasquilacion para el borrego.'
            } )
        }

        return res.json( {
            value: 1,
            trasquilacion
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las trasquilacion del borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la trasquilacion del borrego.'
        } );
    }
}

const registrarTrasquilacionBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idBorrego } = req.params;

    try {
        
        req.body.borrego = idBorrego;

        const trasquilacion = await new TrasquilacionBorrego( req.body )
            .populate( 'borrego', 'numeroBorrego' );

        await trasquilacion.save()

        generarControl( nombre, apellidos, 'registrado una trasquilacion al borrego número', 
                        trasquilacion.borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'La trasquilacion se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al guardar la trasquilacion del borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al guardar la trasquilacion del borrego.'
        } );
    }
}

const actualizarTrasquilacionBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idTrasquilacionBorrego } = req.params;
    const { ...datos } = req.body;

    try {

        const trasquilacionBorrego = await TrasquilacionBorrego.findByIdAndUpdate( idTrasquilacionBorrego, datos )
            .populate( 'borrego', 'numeroBorrego' );

        generarControl( nombre, apellidos, 'actualizado una trasquilacion al borrego número',
                        trasquilacionBorrego.borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'La trasquilacion del borrego se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la trasquilacion del borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la trasquilacion del borrego.'
        } );
    }
}

const eliminarTrasquilacionBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idTrasquilacionBorrego } = req.params;

    try {

        const trasquilacionBorrego = await TrasquilacionBorrego.findByIdAndDelete( idTrasquilacionBorrego )
            .populate( 'borrego', 'numeroBorrego' );

        generarControl( nombre, apellidos, 'eliminado una trasquilacion al borrego número',
                        trasquilacionBorrego.borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'La trasquilacion del borrego se ha eliminado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la trasquilacion del borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la trasquilacion del borrego.'
        } );
    }
}

module.exports = {
    obtenerTrasquilacionBorregos,
    obtenerTrasquilacionBorregoById,
    registrarTrasquilacionBorrego,
    actualizarTrasquilacionBorrego,
    eliminarTrasquilacionBorrego
}