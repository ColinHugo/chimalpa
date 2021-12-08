const { Caballo, DietaYegua } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerDietaYeguas = async ( req, res ) => {

    try {

        const dietas = await DietaYegua.find()
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

        console.error( 'Error al obtener las dietas de las yeguas.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las dietas de las yeguas.'
        } );
    }
}

const obtenerDietaYeguaById = async ( req, res ) => {

    const { idCaballo } = req.params;

    try {

        const dieta = await DietaYegua.where( { caballo: idCaballo } )
            .populate( 'caballo', 'nombre' )
            .populate( 'usuario', [ 'nombre', 'apellidos'] );

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

const registrarDietaYegua = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCaballo } = req.params;

    try {

        const caballo = await Caballo.findById( idCaballo );
        
        req.body.caballo = caballo;

        const dieta = new DietaYegua( req.body );

        await dieta.save()

        generarControl( nombre, apellidos, 'registrado una dieta', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'La dieta se ha registrado.',
            dieta
        } );
        
    } catch ( error ) {

        console.error( 'Error al guardar la dieta de la yegua.', error );

        return res.json( {
            value: 0,
            msg: 'Error al guardar la dieta de la yegua.'
        } );
    }
}

const actualizarDietaYegua = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idDietaCaballo } = req.params;
    const { ...datos } = req.body;

    try {

        const dietaYegua = await DietaYegua.findByIdAndUpdate( idDietaCaballo, datos, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        const caballo = await Caballo.findById( dietaYegua.caballo );

        generarControl( nombre, apellidos, 'actualizado una dieta de caballo', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'La dieta del caballo se ha actualizado.',
            dietaYegua
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
    obtenerDietaYeguas,
    obtenerDietaYeguaById,
    registrarDietaYegua,
    actualizarDietaYegua
}