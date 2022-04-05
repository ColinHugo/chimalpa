const fs = require( 'fs' );
const path = require( 'path' );

const { Conejo } = require( '../models' );

const { generarControl, generarUrlFotos, subirFoto } = require( '../helpers' );

const obtenerConejos = async ( req, res ) => {

    const query = { estado: true };

    try {

        let conejos = await Conejo.find( query )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        if ( conejos.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay conejos registrados.'
            } );
        }

        conejos = generarUrlFotos( req, 'conejos', conejos );

        return res.json( {
            value: 1,
            conejos
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener a los conejos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener a los conejos.'
        } );
    }
}

const obtenerConejoById = async ( req, res ) => {

    const { idConejo } = req.params;

    try {

        let conejo = await Conejo.findById( idConejo )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        conejo = generarUrlFotos( req, 'conejos', conejo );

        return res.json( {
            value: 1,
            conejo
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener el conejo con id ${ idConejo }.` );

        return res.json( {
            value: 0,
            msg: `Error al obtener el conejo con id ${ idConejo }.`
        } );
    }
}

const registrarConejo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    try {

        if ( req.body.foto ) {
            req.body.foto = await subirFoto( req.body.foto, undefined, 'conejos' );
        }

        const conejo = new Conejo( req.body );

        await conejo.save();

        generarControl( nombre, apellidos, 'registrado al conejo número', conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'El conejo se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar al conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar al conejo.'
        } );
    }
}

const actualizarConejo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idConejo } = req.params;
    const { foto, ...datos } = req.body;

    try {

        const conejo = await Conejo.findById( idConejo );

        if ( foto ) {
            if ( conejo.foto ) {
                const pathImagen = path.join( __dirname, '../uploads/conejos/', conejo.foto );

                if ( fs.existsSync( pathImagen ) ) {
                    fs.unlinkSync( pathImagen );
                }
            }

            datos.foto = await subirFoto( req.body.foto, undefined, 'conejos' );
        }

        await conejo.updateOne( datos );

        generarControl( nombre, apellidos, 'actualizado al conejo número', conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'El conejo se ha actualizado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el conejo.'
        } );
    }
}

const eliminarConejo = async ( req, res ) => {

    const { idConejo } = req.params;

    const { nombre, apellidos } = req.body.usuario;

    try {

        const conejo = await Conejo.findByIdAndUpdate( idConejo, { estado: false } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        generarControl( nombre, apellidos, 'eliminado al conejo número', conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'El conejo se ha eliminado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al borrar el conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al borrar el conejo.'
        } );
    }
}

module.exports = {
    obtenerConejos,
    obtenerConejoById,
    registrarConejo,
    actualizarConejo,
    eliminarConejo
}