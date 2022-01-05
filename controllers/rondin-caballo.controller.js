const { Caballo, RondinCaballo } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerRondinById = async ( req, res ) => {

    const { idCaballo } = req.params;
    const { desde } = req.body;

    try {

        const rondin = await RondinCaballo.where( { caballo: idCaballo,
            createdAt: {
                $gte: desde
            }
        } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] )
            .populate( 'caballo', 'nombre' );

        if ( rondin.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay rondines que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            rondin
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener los rondines del caballo con id ${ idCaballo }. ${ error }` );

        return res.json( {
            value: 0,
            msg: `Error al obtener los rondines del caballo con id ${ idCaballo }.`
        } );
    }
}

const registrarRondin = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCaballo } = req.params;

    try {

        const caballo = await Caballo.findById( idCaballo );

        req.body.caballo = caballo;

        const rondin = await RondinCaballo( req.body )
            .populate( 'caballo', 'nombre' );

        await rondin.save();

        generarControl( nombre, apellidos, 'registrado un rondín al caballo', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El rondín se ha registrado.',
            rondin,
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el rondín del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar el rondín del caballo.'
        } );
    }
}

const actualizarRondinCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idRondin } = req.params;
    const { ...datos } = req.body;

    try {

        const rondin = await RondinCaballo.findByIdAndUpdate( idRondin, datos, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        generarControl( nombre, apellidos, 'actualizado un rondín al caballo', rondin.caballo );

        return res.json( {
            value: 1,
            msg: 'El rondín se ha actualizado.',
            rondin
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el rondín.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el rondín.'
        } );
    }
}

module.exports = {
    obtenerRondinById,
    registrarRondin,
    actualizarRondinCaballo
}