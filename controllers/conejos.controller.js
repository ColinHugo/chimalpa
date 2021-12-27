const { Conejo } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerConejos = async ( req, res ) => {

    const query = { estado: true };

    try {

        const conejos = await Conejo.find( query )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        if ( conejos.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay conejos registrados.'
            } );
        }

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

        const conejo = await Conejo.findById( idConejo )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        return res.json( {
            value: 1,
            conejo
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener el conejo con id ${ id }.` );

        return res.json( {
            value: 0,
            msg: `Error al obtener el conejo con id ${ id }.`
        } );
    }
}

const registrarConejo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    try {

        const conejo = new Conejo( req.body );

        await conejo.save();

        generarControl( nombre, apellidos, 'registrado al conejo número', conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'El conejo se ha registrado.',
            conejo,
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
    const { ...datos } = req.body;

    try {

        const conejo = await Conejo.findByIdAndUpdate( idConejo, datos, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        generarControl( nombre, apellidos, 'actualizado al conejo número', conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'El conejo se ha actualizado.',
            conejo
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

        const conejo = await Conejo.findByIdAndUpdate( idConejo, { estado: false }, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        generarControl( nombre, apellidos, 'eliminado al conejo número', conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'El conejo se ha eliminado.',
            conejo
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