const { MedicinaBorrego } = require( '../models' );

const { generarControl } = require( '../helpers' );

const obtenerMedicinaBorrego = async ( req, res ) => {

    try {

        const medicinas = await MedicinaBorrego.find()
            .populate( 'borrego', 'numeroBorrego' );

        if ( medicinas.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay medicinas registradas.'
            } );
        }

        return res.json( {
            value: 1,
            medicinas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las medicinas de los borregos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las medicinas de los borregos.'
        } );
    }
}

const obtenerMedicinaBorregoById = async ( req, res ) => {

    const { idBorrego } = req.params;

    try {

        const medicina = await MedicinaBorrego.where( { borrego: idBorrego } )
            .populate( 'borrego', 'numeroBorrego' );

        if ( medicina.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay medicinas registradas.'
            } );
        }

        return res.json( {
            value: 1,
            medicina
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la medicina preventiva.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la medicina preventiva.'
        } );
    }
}

const registrarMedicinaBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idBorrego } = req.params;

    try {

        req.body.borrego = idBorrego;

        const medicina = await MedicinaBorrego( req.body )
            .populate( 'borrego', 'numeroBorrego' );

        await medicina.save();

        generarControl( nombre, apellidos, 'registrado una medicina al borrego número', medicina.borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'La medicina del borrego se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la medicina del borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la medicina del borrego.'
        } );
    }
}

const actualizarMedicinaBorrego = async ( req, res ) => {
    
    const { nombre, apellidos } = req.body.usuario;
    const { idMedicina } = req.params;
    const { ...datos } = req.body;

    try {

        const medicina = await MedicinaBorrego.findByIdAndUpdate( idMedicina, datos )
            .populate( 'borrego', 'numeroBorrego' );

        generarControl( nombre, apellidos, 'actualizado una medicina al borrego número', 
                        medicina.borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'La medicina del borrego se ha actualizado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la medicina del borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la medicina del borrego.'
        } );
    }
}

const eliminarMedicinaBorrego = async ( req, res ) => {
    
    const { nombre, apellidos } = req.body.usuario;
    const { idMedicina } = req.params;

    try {

        const medicina = await MedicinaBorrego.findByIdAndDelete( idMedicina )
            .populate( 'borrego', 'numeroBorrego' );

        generarControl( nombre, apellidos, 'eliminado una medicina al borrego número',
                        medicina.borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'La medicina del borrego se ha eliminado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la medicina del borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la medicina del borrego.'
        } );
    }
}

module.exports = {
    obtenerMedicinaBorrego,
    obtenerMedicinaBorregoById,
    registrarMedicinaBorrego,
    actualizarMedicinaBorrego,
    eliminarMedicinaBorrego
}