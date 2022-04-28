const { RecortePesunaBorrego } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerRecortesPesunasBorregos = async ( req, res ) => {

    try {

        const recortes = await RecortePesunaBorrego.find(  )
            .populate( 'borrego', 'numeroBorrego' );

        if ( recortes.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay recortes registrados.'
            } );
        }

        return res.json( {
            value: 1,
            recortes
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener los recortes.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener los recortes.'
        } );
    }
}

const obtenerRecortePesunaBorregoById = async ( req, res ) => {

    const { idBorrego } = req.params;

    try {

        const recorte = await RecortePesunaBorrego.where( { borrego: idBorrego } )
            .populate( 'borrego', 'numeroBorrego' );

        if ( recorte.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay recorte para el borrego.'
            } );
        }

        return res.json( {
            value: 1,
            recorte
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener el borrego con id ${ id }.` );

        return res.json( {
            value: 0,
            msg: `Error al obtener el borrego con id ${ id }.`
        } );
    }
}

const registrarRecortePesunaBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idBorrego } = req.params;

    try {

        req.body.borrego = idBorrego;

        const recorte = await RecortePesunaBorrego( req.body )
            .populate( 'borrego', 'numeroBorrego' );

        await recorte.save();

        generarControl( nombre, apellidos, 'registrado un recorte de pesuña al borrego número', 
                        recorte.borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'El recorte de pesuña se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el recorte de pesuña.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar el recorte de pesuña.'
        } );
    }
}

const actualizarRecortePesunaBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idPesunaBorrego } = req.params;
    const { ...datos } = req.body;

    try {

        const recorte = await RecortePesunaBorrego.findByIdAndUpdate( idPesunaBorrego, datos )
            .populate( 'borrego', 'numeroBorrego' );

        generarControl( nombre, apellidos, 'actualizado un recorte de pesuña al borrego número', 
                        recorte.borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'El recorte de pesuña se ha actualizado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el recorte de pesuña.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el recorte de pesuña.'
        } );
    }
}

const eliminarRecortePesunaBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idPesunaBorrego } = req.params;

    try {

        const recorte = await RecortePesunaBorrego.findByIdAndDelete( idPesunaBorrego )
            .populate( 'borrego', 'numeroBorrego' );

        generarControl( nombre, apellidos, 'eliminado un recorte de pesuña al borrego número', 
                        recorte.borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'El recorte de pesuña se ha eliminado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar el recorte de pesuña.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar el recorte de pesuña.'
        } );
    }
}

module.exports = {
    obtenerRecortesPesunasBorregos,
    obtenerRecortePesunaBorregoById,
    registrarRecortePesunaBorrego,
    actualizarRecortePesunaBorrego,
    eliminarRecortePesunaBorrego
}