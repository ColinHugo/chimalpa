const { Caballo } = require( '../models' );

const obtenerCaballos = async ( req, res ) => {

    const query = { estado: true };

    try {

        const caballos = await Caballo.find( query );

        if ( caballos.length === 0 ) {

            return res.json( {
                value: 0,
                msg: 'No hay caballos registrados.'
            } );
        }

        return res.json( {
            value: 1,
            caballos
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener a los caballos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener a los caballos.'
        } );
    }
}

const obtenerCaballoById = async ( req, res ) => {

    const { id } = req.params;

    try {

        const caballo = await Caballo.findById( id );

        return res.json( {
            value: 1,
            caballo
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener el caballo con id ${ id }` );

        return res.json( {
            value: 0,
            msg: `Error al obtener el caballo con id ${ id }`
        } );
    }
}

const agregarCaballo = async ( req, res ) => {

    try {

        const caballo = new Caballo( req.body );

        await caballo.save();

        return res.json( {
            value: 1,
            msg: 'El caballo se ha registrado.',
            caballo
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar al caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar al caballo.'
        } );
    }
}

const actualizarCaballo = async ( req, res ) => {

    const { id } = req.params;
    const { ...datos } = req.body;

    try {

        const caballo = await Caballo.findByIdAndUpdate( id, datos, { new: true } );

        return res.json( {
            value: 1,
            msg: 'El caballo se ha actualizado.',
            caballo
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el caballo.'
        } );
    }}

    const eliminarCaballo = async ( req, res ) => {

        const { id } = req.params;
    
        try {
    
            const caballo = await Caballo.findByIdAndUpdate( id, { estado: false }, { new: true } );
    
            return res.json( {
                value: 1,
                msg: 'El caballo se ha eliminado.',
                caballo
            } );
            
        } catch ( error ) {
    
            console.error( 'Error al borrar el caballo.', error );
    
            return res.json( {
                value: 0,
                msg: 'Error al borrar el caballo.'
            } );
        }}

module.exports = {
    obtenerCaballos,
    obtenerCaballoById,
    agregarCaballo,
    actualizarCaballo,
    eliminarCaballo
}