const { HistoriaClinicaMascota, Mascota } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerHistoriaClinicaMascotas = async ( req, res ) => {

    try {

        const historiaMascotas = await HistoriaClinicaMascota.find()
            .populate( 'mascota', 'nombre' );

        if ( historiaMascotas.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historia que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            historiaMascotas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la historia de las mascotas.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la historia de las mascotas.'
        } );
    }
}

const obtenerHistoriaClinicaMascotaById = async ( req, res ) => {

    const { idMascota } = req.params;

    try {

        const historiaMascota = await HistoriaClinicaMascota.where( { mascota: idMascota } )
            .populate( 'mascota', 'nombre' );

        if ( historiaMascota.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historia para la mascota.'
            } );
        }

        return res.json( {
            value: 1,
            historiaMascota
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la historia de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la historia de la mascota.'
        } );
    }
}

const registrarHistoriaClinicaMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idMascota } = req.params;

    try {

        const mascota = await Mascota.findById( idMascota );

        req.body.mascota = mascota;

        const historiaMascota = await HistoriaClinicaMascota( req.body )
            .populate( 'mascota', 'nombre' );
            
        await historiaMascota.save();

        generarControl( nombre, apellidos, 'registrado un historial clínico a la mascota', mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La historia de la mascota se ha registrado.',
            historiaMascota
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la historia de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la historia de la mascota.'
        } );
    }
}

const actualizarHistoriaClinicaMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorial } = req.params;
    const { usuario, ...datos} = req.body;

    try {

        const historiaMascota = await HistoriaClinicaMascota.findByIdAndUpdate( idHistorial, datos, { new: true } )
            .populate( 'mascota', 'nombre' );

        const mascota = await Mascota.findById( historiaMascota.mascota );

        generarControl( nombre, apellidos, 'actualizado un historial clínico a la mascota', mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'El historial de la mascota se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el historial de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el historial de la mascota.'
        } );
    }
}

module.exports = {
    obtenerHistoriaClinicaMascotas,
    obtenerHistoriaClinicaMascotaById,
    registrarHistoriaClinicaMascota,
    actualizarHistoriaClinicaMascota
}