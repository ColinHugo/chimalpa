const { Mascota, HistorialReproductivoMascota } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerHistorialReproductivoMascotas = async ( req, res ) => {

    try {

        const historialReproductivo = await HistorialReproductivoMascota.find()
            .populate( 'mascota', 'nombre' );

        if ( historialReproductivo.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historial reproductivo que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            historialReproductivo
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener los historiales reproductivos de las mascotas.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener los historiales reproductivos de las mascotas.'
        } );
    }
}

const obtenerHistorialReproductivoMascotaById = async ( req, res ) => {

    const { idMascota } = req.params;

    try {

        const historial = await HistorialReproductivoMascota.where( { mascota: idMascota } )
            .populate( 'mascota', 'nombre' );

        if ( historial.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historial para la mascota.'
            } );
        }

        return res.json( {
            value: 1,
            historial
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener el historial reproductivo de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener el historial reproductivo de la mascota.'
        } );
    }
}

const registrarHistorialReproductivoMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idMascota } = req.params;

    try {

        const mascota = await Mascota.findById( idMascota );

        req.body.mascota = mascota;

        const historialReproductivoMascota = await HistorialReproductivoMascota( req.body )
            .populate( 'mascota', 'nombre' );

        await historialReproductivoMascota.save();

        generarControl( nombre, apellidos, 'registrado un historial reproductivo a la mascota', mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'El historial reproductivo de la mascota se ha registrado.',
            historialReproductivoMascota
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el historial reproductivo de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar el historial reproductivo de la mascota.'
        } );
    }
}

const actualizarHistorialReproductivoMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorialReproductivo } = req.params;
    const { ...datos} = req.body;

    try {

        const historial = await HistorialReproductivoMascota.findByIdAndUpdate( idHistorialReproductivo, datos, { new: true } )
            .populate( 'mascota', 'nombre' );

        const mascota = await Mascota.findById( historial.mascota );

        generarControl( nombre, apellidos, 'actualizado un historial reproductivo a la mascota', mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'El historial reproductivo de la mascota se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el historial reproductivo de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el historial reproductivo de la mascota.'
        } );
    }
}

module.exports = {
    obtenerHistorialReproductivoMascotas,
    obtenerHistorialReproductivoMascotaById,
    registrarHistorialReproductivoMascota,
    actualizarHistorialReproductivoMascota
}