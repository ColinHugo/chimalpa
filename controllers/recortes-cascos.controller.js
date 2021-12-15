const { Caballo, RecorteCasco } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerRecortes = async ( req, res ) => {

    try {

        const recortes = await RecorteCasco.find(  )
            .populate( 'caballo', 'nombre' );

        if ( recortes.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay recortes registrados.'
            } );
        }

        return res.json( {
            value: 1,
            recortes
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener los recortes.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener los recortes.'
        } );
    }
}

const obtenerRecorteById = async ( req, res ) => {

    const { idCaballo } = req.params;

    try {

        const recorte = await RecorteCasco.where( { caballo: idCaballo } )
            .populate( 'caballo', 'nombre' );

        if ( recorte.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay recorte para el caballo.'
            } );
        }

        return res.json( {
            value: 1,
            recorte
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener el caballo con id ${ id }.` );

        return res.json( {
            value: 0,
            msg: `Error al obtener el caballo con id ${ id }.`
        } );
    }
}

const registrarRecorte = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { frecuencia, descripcion } = req.body;
    const { idCaballo } = req.params;

    try {

        const caballo = await Caballo.findById( idCaballo );

        const recorte = await RecorteCasco( { frecuencia, descripcion, caballo } )
            .populate( 'caballo', 'nombre' );

        await recorte.save();

        generarControl( nombre, apellidos, 'registrado un recorte de casco', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El recorte de casco se ha registrado.',
            recorte,
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el recorte de casco.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar el recorte de casco.'
        } );
    }
}

const actualizarRecorte = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCasco } = req.params;
    const { ...datos } = req.body;

    try {

        const recorte = await RecorteCasco.findByIdAndUpdate( idCasco, datos, { new: true } )
            .populate( 'caballo', 'nombre' );

        const caballo = await Caballo.findById( recorte.caballo );

        generarControl( nombre, apellidos, 'actualizado un recorte de casco', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El recorte de casco se ha actualizado.',
            recorte
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el recorte de casco.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el recorte de casco.'
        } );
    }
}

module.exports = {
    obtenerRecortes,
    obtenerRecorteById,
    registrarRecorte,
    actualizarRecorte
}