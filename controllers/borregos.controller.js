const { Borrego } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerBorregos = async ( req, res ) => {

    const query = { estado: true };

    try {

        const borregos = await Borrego.find( query )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        if ( borregos.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay borregos registrados.'
            } );
        }

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

        const borrego = await Borrego.findById( idBorrego )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        return res.json( {
            value: 1,
            borrego
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener el borrego con id ${ id }.` );

        return res.json( {
            value: 0,
            msg: `Error al obtener el borrego con id ${ id }.`
        } );
    }
}

const registrarBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    try {

        const borrego = new Borrego( req.body );

        await borrego.save();

        generarControl( nombre, apellidos, 'registrado al borrego', borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'El borrego se ha registrado.',
            borrego,
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
    const { ...datos } = req.body;

    try {

        const borrego = await Borrego.findByIdAndUpdate( idBorrego, datos, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        generarControl( nombre, apellidos, 'actualizado al borrego', borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'El borrego se ha actualizado.',
            borrego
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

        const borrego = await Borrego.findByIdAndUpdate( idBorrego, { estado: false }, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        generarControl( nombre, apellidos, 'eliminado al borrego', borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'El borrego se ha eliminado.',
            borrego
        } );
        
    } catch ( error ) {

        console.error( 'Error al borrar el borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al borrar el borrego.'
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