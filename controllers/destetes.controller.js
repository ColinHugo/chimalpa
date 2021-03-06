const { DesteteCaballo } = require( '../models' );

const { generarControl } = require( '../helpers' );

const obtenerDestetesCaballos = async ( req, res ) => {

    try {

        const destetes = await DesteteCaballo.find()
            .populate( 'caballo', 'nombre' );

        if ( destetes.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay destetes que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            destetes
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener los destetes de los caballos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener los destetes de los caballos.'
        } );
    }
}

const obtenerDesteteCaballoById = async ( req, res ) => {

    const { idCaballo } = req.params;

    try {

        const destete = await DesteteCaballo.where( { caballo: idCaballo } )
            .populate( 'caballo', 'nombre' );

        if ( destete.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay destete para el caballo.'
            } );
        }

        return res.json( {
            value: 1,
            destete
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener el destete del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener el destete del caballo.'
        } );
    }
}

const registrarDesteteCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCaballo } = req.params;

    try {

        req.body.caballo = idCaballo;

        const desteteCaballo = await DesteteCaballo( req.body )
            .populate( 'caballo', 'nombre' );

        await desteteCaballo.save();

        generarControl( nombre, apellidos, 'registrado un destete al caballo', desteteCaballo.caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El destete del caballo se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el destete del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar el destete del caballo.'
        } );
    }
}

const actualizarDesteteCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idDestete } = req.params;

    try {

        const destete = await DesteteCaballo.findByIdAndUpdate( idDestete, req.body )
            .populate( 'caballo', 'nombre' );

        generarControl( nombre, apellidos, 'actualizado un destete al caballo', destete.caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El destete del caballo se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el destete del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el destete del caballo.'
        } );
    }
}

module.exports = {
    obtenerDestetesCaballos,
    obtenerDesteteCaballoById,
    registrarDesteteCaballo,
    actualizarDesteteCaballo
}