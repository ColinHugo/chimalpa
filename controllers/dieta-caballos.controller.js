const { Caballo, DietaCaballo } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerDietaCaballos = async ( req, res ) => {

    try {

        const dietas = await DietaCaballo.find()
            .populate( 'caballo', 'nombre' )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

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

        console.error( 'Error al obtener las dietas de los caballos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las dietas de los caballos.'
        } );
    }
}

const obtenerDietaCaballoById = async ( req, res ) => {

    const { idCaballo } = req.params;

    try {

        const dieta = await DietaCaballo.where( { caballo: idCaballo } )
            .populate( 'caballo', 'nombre' )
            .populate( 'usuario', [ 'nombre', 'apellidos'] );

        if ( dieta.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay dieta para el caballo.'
            } )
        }

        return res.json( {
            value: 1,
            dieta
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las dieta del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la dieta del caballo.'
        } );
    }
}

const registrarDietaCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCaballo } = req.params;

    try {

        const caballo = await Caballo.findById( idCaballo );
        
        req.body.caballo = caballo;

        const dieta = new DietaCaballo( req.body );

        await dieta.save()

        generarControl( nombre, apellidos, 'registrado una dieta', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'La dieta se ha registrado.',
            dieta
        } );
        
    } catch ( error ) {

        console.error( 'Error al guardar la dieta del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al guardar la dieta del caballo.'
        } );
    }
}

const actualizarDietaCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idDietaCaballo } = req.params;
    const { ...datos } = req.body;

    try {

        const dietaCaballo = await DietaCaballo.findByIdAndUpdate( idDietaCaballo, datos, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        const caballo = await Caballo.findById( dietaCaballo.caballo );

        generarControl( nombre, apellidos, 'actualizado una dieta de caballo', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'La dieta del caballo se ha actualizado.',
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
    obtenerDietaCaballos,
    obtenerDietaCaballoById,
    registrarDietaCaballo,
    actualizarDietaCaballo
}