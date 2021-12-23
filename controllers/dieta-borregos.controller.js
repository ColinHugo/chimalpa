const { Borrego, DietaBorrego } = require( '../models' );

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

        const borrego = await Borrego.findById( idBorrego );
        
        req.body.borrego = borrego;

        const dieta = new DietaBorrego( req.body );

        await dieta.save()

        generarControl( nombre, apellidos, 'registrado una dieta al borrego', borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'La dieta se ha registrado.',
            dieta
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

        const dietaBorrego = await DietaBorrego.findByIdAndUpdate( idDietaBorrego, datos, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        const borrego = await Borrego.findById( dietaBorrego.borrego );

        generarControl( nombre, apellidos, 'actualizado una dieta del borrego', borrego.numeroBorrego );

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

module.exports = {
    obtenerDietaBorregos,
    obtenerDietaBorregoById,
    registrarDietaBorrego,
    actualizarDietaBorrego
}