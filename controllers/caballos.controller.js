const fs = require( 'fs' );
const path = require( 'path' );

const { Caballo } = require( '../models' );

const { generarControl, generarUrlFotos, subirFoto } = require( '../helpers' );

const obtenerCaballos = async ( req, res ) => {

    const query = { estado: true };

    try {

        let caballos = await Caballo.find( query )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        if ( caballos.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay caballos registrados.'
            } );
        }

        caballos = generarUrlFotos( req, 'caballos', caballos );

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

    const { idCaballo } = req.params;

    try {

        let caballo = await Caballo.findById( idCaballo )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        caballo = generarUrlFotos( req, 'caballos', caballo );

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

        if ( req.body.foto ) {
            req.body.foto = await subirFoto( req.body.foto, undefined, 'caballos' );
        }

        const caballo = new Caballo( req.body );

        await caballo.save();

        generarControl( nombre, apellidos, 'registrado al caballo', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El caballo se ha registrado.'
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
    const { foto, ...datos } = req.body;

    try {

        const caballo = await Caballo.findById( idCaballo );

        if ( foto ) {
            if ( caballo.foto ) {
                const pathImagen = path.join( __dirname, '../uploads/caballos/', caballo.foto );

                if ( fs.existsSync( pathImagen ) ) {
                    fs.unlinkSync( pathImagen );
                }
            }

            datos.foto = await subirFoto( req.body.foto, undefined, 'caballos' );
        }

        await caballo.updateOne( datos );

        generarControl( nombre, apellidos, 'actualizado al caballo', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El caballo se ha actualizado.'
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

        const caballo = await Caballo.findByIdAndUpdate( idCaballo, { estado: false } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        generarControl( nombre, apellidos, 'eliminado al caballo', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El caballo se ha eliminado.'
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