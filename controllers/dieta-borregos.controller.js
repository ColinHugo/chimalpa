const { DietaBorrego } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerDietaBorregos = async ( req, res ) => {

    try {

        const dietas = await DietaBorrego.find()
            .populate( 'borrego', 'numeroBorrego' )
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

        console.error( 'Error al obtener las dietas de los borregos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las dietas de los borregos.'
        } );
    }
}

const obtenerDietaBorregoById = async ( req, res ) => {

    const { idBorrego } = req.params;

    try {

        const dieta = await DietaBorrego.where( { borrego: idBorrego } )
            .populate( 'borrego', 'numeroBorrego' )
            .populate( 'usuario', [ 'nombre', 'apellidos'] );

        if ( dieta.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay dieta para el borrego.'
            } )
        }

        return res.json( {
            value: 1,
            dieta
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las dieta del borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la dieta del borrego.'
        } );
    }
}

const registrarDietaBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idBorrego } = req.params;

    try {
        
        req.body.borrego = idBorrego;

        const dieta = await new DietaBorrego( req.body )
            .populate( 'borrego', 'numeroBorrego' );

        await dieta.save()

        generarControl( nombre, apellidos, 'registrado una dieta al borrego número', dieta.borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'La dieta se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al guardar la dieta del borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al guardar la dieta del borrego.'
        } );
    }
}

const actualizarDietaBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idDietaBorrego } = req.params;
    const { ...datos } = req.body;

    try {

        const dietaBorrego = await DietaBorrego.findByIdAndUpdate( idDietaBorrego, datos )
            .populate( 'borrego', 'numeroBorrego' );

        generarControl( nombre, apellidos, 'actualizado una dieta al borrego número', 
                        dietaBorrego.borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'La dieta del borrego se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la dieta del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la dieta del caballo.'
        } );
    }
}

const eliminarDietaBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idDietaBorrego } = req.params;

    try {

        const dietaBorrego = await DietaBorrego.findByIdAndDelete( idDietaBorrego )
            .populate( 'borrego', 'numeroBorrego' );

        generarControl( nombre, apellidos, 'eliminado una dieta al borrego número',
                        dietaBorrego.borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'La dieta del borrego se ha eliminado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la dieta del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la dieta del caballo.'
        } );
    }
}

module.exports = {
    obtenerDietaBorregos,
    obtenerDietaBorregoById,
    registrarDietaBorrego,
    actualizarDietaBorrego,
    eliminarDietaBorrego
}