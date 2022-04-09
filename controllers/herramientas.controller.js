const fs = require( 'fs' );
const path = require( 'path' );

const { Herramienta } = require( '../models' );

const { generarControl, generarUrlFotos, subirFoto } = require( '../helpers' );

const obtenerHerramientas = async ( req, res ) => {

    const query = { estado: true };

    try {

        let herramientas = await Herramienta.find( query )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        if ( herramientas.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay herramientas registradas.'
            } );
        }

        herramientas = generarUrlFotos( req, 'herramientas', herramientas );

        return res.json( {
            value: 1,
            herramientas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las herramientas.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las herramientas.'
        } );
    }
}

const obtenerHerramientaById = async ( req, res ) => {

    const { idHerramienta } = req.params;

    try {

        let herramienta = await Herramienta.findById( idHerramienta )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

            herramienta = generarUrlFotos( req, 'herramientas', herramienta );

        return res.json( {
            value: 1,
            herramienta
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener la herramienta con id ${ id }.` );

        return res.json( {
            value: 0,
            msg: `Error al obtener la herramienta con id ${ id }.`
        } );
    }
}

const registrarHerramienta = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    try {

        if ( req.body.foto ) {
            req.body.foto = await subirFoto( req.body.foto, undefined, 'herramientas' );
        }

        const herramienta = new Herramienta( req.body );

        await herramienta.save();

        generarControl( nombre, apellidos, 'registrado la herramienta', herramienta.tipo );

        return res.json( {
            value: 1,
            msg: 'La herramienta se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la herramienta.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la herramienta.'
        } );
    }
}

const actualizarHerramienta = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idHerramienta } = req.params;
    const { cantidad, foto, ...datos } = req.body;

    try {

        const herramienta = await Herramienta.findById( idHerramienta );

        if ( cantidad ) {

            Number( cantidad );
            Number( herramienta.cantidad );

            if ( isNaN( cantidad ) || isNaN( herramienta.cantidad ) ) {

                return res.json( {
                    value: 0,
                    msg: 'No son cantidades númericas válidas.'
                } );
            } 

            datos.cantidad = herramienta.cantidad + cantidad;
        }

        if ( foto ) {
            if ( herramienta.foto ) {
                const pathImagen = path.join( __dirname, '../uploads/herramientas/', herramienta.foto );

                if ( fs.existsSync( pathImagen ) ) {
                    fs.unlinkSync( pathImagen );
                }
            }

            datos.foto = await subirFoto( req.body.foto, undefined, 'herramientas' );
        }

        await herramienta.updateOne( datos );

        generarControl( nombre, apellidos, 'actualizado la herramienta', herramienta.tipo );

        return res.json( {
            value: 1,
            msg: 'La herramienta se ha actualizado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la herramienta.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la herramienta.'
        } );
    }
}

const eliminarHerramienta = async ( req, res ) => {

    const { idHerramienta } = req.params;

    const { nombre, apellidos } = req.body.usuario;

    const { cantidad, ...datos } = req.body;

    try {

        const herramienta = await Herramienta.findById( idHerramienta );

        Number( cantidad );
        Number( herramienta.cantidad );

        if ( isNaN( cantidad ) || isNaN( herramienta.cantidad ) ) {

            return res.json( {
                value: 0,
                msg: 'No son cantidades númericas válidas.'
            } );
        } 

        if( cantidad > herramienta.cantidad  ){

            return res.json( {
                value: 0,
                msg: 'No puedes quitar más herramientas de las que existen en inventario.'
            } );
        }
        
        datos.cantidad = herramienta.cantidad - cantidad;

        await herramienta.updateOne( datos );

        generarControl( nombre, apellidos, 'eliminado la herramienta', herramienta.tipo );

        return res.json( {
            value: 1,
            msg: 'La herramienta se ha eliminado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la herramienta.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la herramienta.'
        } );
    }
}

module.exports = {
    obtenerHerramientas,
    obtenerHerramientaById,
    registrarHerramienta,
    actualizarHerramienta,
    eliminarHerramienta
}