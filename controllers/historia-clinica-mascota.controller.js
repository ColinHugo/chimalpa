const { HistoriaClinicaMascota } = require( '../models' );

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

        req.body.mascota = idMascota;

        const historiaMascota = await HistoriaClinicaMascota( req.body )
            .populate( 'mascota', 'nombre' );
            
        await historiaMascota.save();

        generarControl( nombre, apellidos, 'registrado un historial clínico a la mascota', historiaMascota.mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La historia de la mascota se ha registrado.'
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
    const { ...datos} = req.body;

    try {

        const historiaMascota = await HistoriaClinicaMascota.findByIdAndUpdate( idHistorial, datos )
            .populate( 'mascota', 'nombre' );

        generarControl( nombre, apellidos, 'actualizado un historial clínico a la mascota', historiaMascota.mascota.nombre );

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

const eliminarHistoriaClinicaMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorial } = req.params;

    try {

        const historiaMascota = await HistoriaClinicaMascota.findByIdAndDelete( idHistorial )
            .populate( 'mascota', 'nombre' );

        generarControl( nombre, apellidos, 'eliminado un historial clínico a la mascota', historiaMascota.mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'El historial de la mascota se ha eliminado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar el historial de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar el historial de la mascota.'
        } );
    }
}

module.exports = {
    obtenerHistoriaClinicaMascotas,
    obtenerHistoriaClinicaMascotaById,
    registrarHistoriaClinicaMascota,
    actualizarHistoriaClinicaMascota,
    eliminarHistoriaClinicaMascota
}