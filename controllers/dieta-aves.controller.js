const { DietaAve } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerDietaAves = async ( req, res ) => {

    try {

        const dietas = await DietaAve.find()
            .populate( 'ave', 'numeroAve' )
            .populate( 'usuario', [ 'nombre', 'apellidos'] );

        if ( dietas.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay dietas que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            dietas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las dietas de las aves.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las dietas de las aves.'
        } );
    }
}

const obtenerDietaAveById = async ( req, res ) => {

    const { idAve } = req.params;

    try {

        const dieta = await DietaAve.where( { ave: idAve } )
            .populate( 'ave', 'numeroAve' )
            .populate( 'usuario', [ 'nombre', 'apellidos'] );

        if ( dieta.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay dieta para el ave.'
            } )
        }

        return res.json( {
            value: 1,
            dieta
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las dieta de las aves.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener lsa dietas de las aves.'
        } );
    }
}

const registrarDietaAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idAve } = req.params;

    try {
        
        req.body.ave = idAve;

        const dieta = await new DietaAve( req.body )
            .populate( 'ave', 'numeroAve' );

        await dieta.save()

        generarControl( nombre, apellidos, 'registrado una dieta al ave n??mero', dieta.ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'La dieta se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al guardar la dieta del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al guardar la dieta del ave.'
        } );
    }
}

const actualizarDietaAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idDietaAve } = req.params;
    const { ...datos } = req.body;

    try {

        const dietaAve = await DietaAve.findByIdAndUpdate( idDietaAve, datos )
            .populate( 'ave', 'numeroAve' );

        generarControl( nombre, apellidos, 'actualizado una dieta al ave n??mero', dietaAve.ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'La dieta del ave se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la dieta del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la dieta del ave.'
        } );
    }
}

const eliminarDietaAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idDietaAve } = req.params;

    try {

        const dietaAve = await DietaAve.findByIdAndDelete( idDietaAve )
            .populate( 'ave', 'numeroAve' );

        generarControl( nombre, apellidos, 'eliminado una dieta al ave n??mero', dietaAve.ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'La dieta del ave se ha eliminado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la dieta del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la dieta del ave.'
        } );
    }
}

module.exports = {
    obtenerDietaAves,
    obtenerDietaAveById,
    registrarDietaAve,
    actualizarDietaAve,
    eliminarDietaAve
}