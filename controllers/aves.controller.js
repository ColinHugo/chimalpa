const { Ave } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerAves = async ( req, res ) => {

    const query = { estado: true };

    try {

        const aves = await Ave.find( query )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        if ( aves.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay aves registradas.'
            } );
        }

        return res.json( {
            value: 1,
            aves
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener a las aves.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener a las aves.'
        } );
    }
}

const obtenerAveById = async ( req, res ) => {

    const { idAve } = req.params;

    try {

        const ave = await Ave.findById( idAve )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        return res.json( {
            value: 1,
            ave
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener el ave con id ${ id }. ${ error }` );

        return res.json( {
            value: 0,
            msg: `Error al obtener el ave con id ${ id }.`
        } );
    }
}

const registrarAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    try {

        const ave = new Ave( req.body );

        await ave.save();

        generarControl( nombre, apellidos, 'registrado al ave', ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'El ave se ha registrado.',
            ave,
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar al ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar al ave.'
        } );
    }
}

const actualizarAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idAve } = req.params;
    const { ...datos } = req.body;

    try {

        const ave = await Ave.findByIdAndUpdate( idAve, datos, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        generarControl( nombre, apellidos, 'actualizado al ave número', ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'El ave se ha actualizado.',
            ave
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el ave.'
        } );
    }
}

const eliminarAve = async ( req, res ) => {

    const { idAve } = req.params;

    const { nombre, apellidos } = req.body.usuario;

    try {

        const ave = await Ave.findByIdAndUpdate( idAve, { estado: false }, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        generarControl( nombre, apellidos, 'eliminado al ave número', ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'El ave se ha eliminado.',
            ave
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar el ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar el ave.'
        } );
    }
}

module.exports = {
    obtenerAves,
    obtenerAveById,
    registrarAve,
    actualizarAve,
    eliminarAve
}