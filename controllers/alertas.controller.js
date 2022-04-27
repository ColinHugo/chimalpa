const fs = require( 'fs' );
const path = require( 'path' );

const { Alerta } = require( '../models' );

const { generarControl, generarUrlFotos, subirFoto } = require( '../helpers' );

const obtenerAlertas = async ( req, res ) => {

    try {

        let alertas = await Alerta.find()
            .populate( 'caballo', 'nombre' )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        if ( alertas.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay alertas que mostrar'
            } );
        }

        alertas = generarUrlFotos( req, 'caballos', alertas );

        return res.json( {
            value: 1,
            alertas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las alertas.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las alertas.'
        } );
    }
}

const registrarAlerta = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCaballo } = req.params;

    try {
        
        req.body.caballo = idCaballo;

        if ( req.body.foto ) {
            req.body.foto = await subirFoto( req.body.foto, undefined, 'caballos' );
        }

        const alerta = await new Alerta( req.body )
            .populate( 'caballo', 'nombre' );

        await alerta.save();

        generarControl( nombre, apellidos, 'registrado la alerta para el caballo', alerta.caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'La alerta se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la alerta.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la alerta.'
        } );
    }
}

const actualizarAlerta = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idAlerta } = req.params;
    const { foto, ...datos } = req.body;

    try {

        const alerta = await Alerta.findById( idAlerta );

        if ( foto ) {
            if ( alerta.foto ) {
                const pathImagen = path.join( __dirname, '../uploads/caballos', alerta.foto );

                if ( fs.existsSync( pathImagen ) ) {
                    fs.unlinkSync( pathImagen );
                }
            }

            datos.foto = await subirFoto( req.body.foto, undefined, 'caballos' );
        }

        await alerta.updateOne( datos );

        generarControl( nombre, apellidos, 'actualizado la alerta', alerta.descripcion );

        return res.json( {
            value: 1,
            msg: 'La alerta se ha actualizado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la alerta.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la alerta.'
        } );
    }
}

const eliminarAlerta = async ( req, res ) => {

    const { idAlerta } = req.params;

    const { nombre, apellidos } = req.body.usuario;

    try {

        const alerta = await Alerta.findById( idAlerta )

        if ( alerta.foto ) {

            const pathImagen = path.join( __dirname, '../uploads/caballos', alerta.foto );

            if ( fs.existsSync( pathImagen ) ) {
                fs.unlinkSync( pathImagen );
            }
        }

        await alerta.deleteOne();

        generarControl( nombre, apellidos, 'eliminado la alerta', alerta.descripcion );

        return res.json( {
            value: 1,
            msg: 'La alerta se ha eliminado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la alerta.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la alerta.'
        } );
    }
}

module.exports = {
    obtenerAlertas,
    registrarAlerta,
    actualizarAlerta,
    eliminarAlerta
}