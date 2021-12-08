const { Caballo } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerCaballos = async ( req, res ) => {

    const query = { estado: true };

    try {

        const caballos = await Caballo.find( query )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

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

        const caballo = await Caballo.findById( id )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        return res.json( {
            value: 1,
            caballo
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener el caballo con id ${ id }.` );

        return res.json( {
            value: 0,
            msg: `Error al obtener el caballo con id ${ id }.`
        } );
    }
}

const registrarCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    try {

        const caballo = new Caballo( req.body );

        await caballo.save();

        generarControl( nombre, apellidos, 'registrado', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El caballo se ha registrado.',
            caballo,
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

    const { nombre, apellidos } = req.body.usuario;

    const { idCaballo } = req.params;
    const { ...datos } = req.body;

    try {

        const caballo = await Caballo.findByIdAndUpdate( idCaballo, datos, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        generarControl( nombre, apellidos, 'actualizado', caballo.nombre );

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
    }
}

const eliminarCaballo = async ( req, res ) => {

    const { idCaballo } = req.params;

    const { nombre, apellidos } = req.body.usuario;

    try {

        const caballo = await Caballo.findByIdAndUpdate( idCaballo, { estado: false }, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        generarControl( nombre, apellidos, 'eliminado', caballo.nombre );

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
    }
}

module.exports = {
    obtenerCaballos,
    obtenerCaballoById,
    registrarCaballo,
    actualizarCaballo,
    eliminarCaballo
}