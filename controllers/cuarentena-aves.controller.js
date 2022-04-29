const { CuarentenaAve } = require( '../models' );

const { generarControl } = require( '../helpers' );

const obtenerCuarentenaAves = async ( req, res ) => {

    try {

        const cuarentenas = await CuarentenaAve.find()
            .populate( 'ave', 'numeroAve' )
            .populate( 'usuario', [ 'nombre', 'apellidos'] );

        if ( cuarentenas.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay cuarentenas que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            cuarentenas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las cuarentenas de las aves.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las dietas de las cuarentenas.'
        } );
    }
}

const obtenerCuarentenaAveById = async ( req, res ) => {

    const { idAve } = req.params;

    try {

        const cuarentena = await CuarentenaAve.where( { ave: idAve } )
            .populate( 'ave', 'numeroAve' )
            .populate( 'usuario', [ 'nombre', 'apellidos'] );

        if ( cuarentena.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay cuarentena para el ave.'
            } )
        }

        return res.json( {
            value: 1,
            cuarentena
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la cuarentena del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la cuarentena del ave.'
        } );
    }
}

const registrarCuarentenaAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idAve } = req.params;

    try {

        req.body.ave = idAve;

        const cuarentena = await new CuarentenaAve( req.body )
            .populate( 'ave', 'numeroAve' );

        await cuarentena.save();

        generarControl( nombre, apellidos, 'registrado una cuarentena al ave número', cuarentena.ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'La cuarentena se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al guardar la cuarentena del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al guardar la cuarentena del ave.'
        } );
    }
}

const actualizarCuarentenaAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCuarentena } = req.params;
    const { ...datos } = req.body;

    try {

        const cuarentenaAve = await CuarentenaAve.findByIdAndUpdate( idCuarentena, datos )
            .populate( 'ave', 'numeroAve' );

        generarControl( nombre, apellidos, 'actualizado una cuarentena al ave número', cuarentenaAve.ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'La cuarentena del ave se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la cuarentena del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la cuarentena del ave.'
        } );
    }
}

const eliminarCuarentenaAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCuarentena } = req.params;

    try {

        const cuarentenaAve = await CuarentenaAve.findByIdAndDelete( idCuarentena )
            .populate( 'ave', 'numeroAve' );

        generarControl( nombre, apellidos, 'eliminado una cuarentena al ave número', cuarentenaAve.ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'La cuarentena del ave se ha eliminado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la cuarentena del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la cuarentena del ave.'
        } );
    }
}

module.exports = {
    obtenerCuarentenaAves,
    obtenerCuarentenaAveById,
    registrarCuarentenaAve,
    actualizarCuarentenaAve,
    eliminarCuarentenaAve
}