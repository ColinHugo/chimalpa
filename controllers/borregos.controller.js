const fs = require( 'fs' );
const path = require( 'path' );

const { Borrego } = require( '../models' );

const { generarControl, generarUrlFotos, subirFoto } = require( '../helpers' );

const obtenerBorregos = async ( req, res ) => {

    const query = { estado: true };

    try {

        let borregos = await Borrego.find( query )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        if ( borregos.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay borregos registrados.'
            } );
        }

        borregos = generarUrlFotos( req, 'borregos', borregos );

        return res.json( {
            value: 1,
            borregos
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener a los borregos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener a los borregos.'
        } );
    }
}

const obtenerBorregoById = async ( req, res ) => {

    const { idBorrego } = req.params;

    try {

        let borrego = await Borrego.findById( idBorrego )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        borrego = generarUrlFotos( req, 'borregos', borrego );

        return res.json( {
            value: 1,
            borrego
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener el borrego con id ${ idBorrego }.` );

        return res.json( {
            value: 0,
            msg: `Error al obtener el borrego con id ${ idBorrego }.`
        } );
    }
}

const registrarBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    try {

        if ( req.body.foto ) {
            req.body.foto = await subirFoto( req.body.foto, undefined, 'borregos' );
        }

        const borrego = new Borrego( req.body );

        await borrego.save();

        generarControl( nombre, apellidos, 'registrado al borrego', borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'El borrego se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar al borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar al borrego.'
        } );
    }
}

const actualizarBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idBorrego } = req.params;
    const { foto, ...datos } = req.body;

    try {

        const borrego = await Borrego.findById( idBorrego );

        if ( foto ) {
            if ( borrego.foto ) {
                const pathImagen = path.join( __dirname, '../uploads/borregos/', borrego.foto );

                if ( fs.existsSync( pathImagen ) ) {
                    fs.unlinkSync( pathImagen );
                }
            }

            datos.foto = await subirFoto( req.body.foto, undefined, 'borregos' );
        }

        await borrego.updateOne( datos );

        generarControl( nombre, apellidos, 'actualizado al borrego número', borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'El borrego se ha actualizado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el borrego.'
        } );
    }
}

const eliminarBorrego = async ( req, res ) => {

    const { idBorrego } = req.params;

    const { nombre, apellidos } = req.body.usuario;

    try {

        const borrego = await Borrego.findByIdAndUpdate( idBorrego, { estado: false } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        generarControl( nombre, apellidos, 'eliminado al borrego número', borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'El borrego se ha eliminado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar el borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar el borrego.'
        } );
    }
}

module.exports = {
    obtenerBorregos,
    obtenerBorregoById,
    registrarBorrego,
    actualizarBorrego,
    eliminarBorrego
}