const { MedicinaMascota } = require( '../models' );

const { generarControl } = require( '../helpers' );

const obtenerMedicinaMascota = async ( req, res ) => {

    try {

        const medicinas = await MedicinaMascota.find()
            .populate( 'mascota', 'nombre' );

        if ( medicinas.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay medicinas registradas.'
            } );
        }

        return res.json( {
            value: 1,
            medicinas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las medicinas de las mascotas.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las medicinas de las mascotas.'
        } );
    }
}

const obtenerMedicinaMascotaById = async ( req, res ) => {

    const { idMascota } = req.params;

    try {

        const medicina = await MedicinaMascota.where( { mascota: idMascota } )
            .populate( 'mascota', 'nombre' );

        if ( medicina.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay medicinas registradas.'
            } );
        }

        return res.json( {
            value: 1,
            medicina
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la medicina preventiva.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la medicina preventiva.'
        } );
    }
}

const registrarMedicinaMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idMascota } = req.params;

    try {

        req.body.mascota = idMascota;

        const medicina = await MedicinaMascota( req.body )
            .populate( 'mascota', 'nombre' );

        await medicina.save();

        generarControl( nombre, apellidos, 'registrado una medicina a la mascota', medicina.mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La medicina de la mascota se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la medicina de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la medicina de la mascota.'
        } );
    }
}

const actualizarMedicinaMascota = async ( req, res ) => {
    
    const { nombre, apellidos } = req.body.usuario;
    const { idMedicina } = req.params;
    const { ...datos } = req.body;

    try {

        const medicina = await MedicinaMascota.findByIdAndUpdate( idMedicina, datos )
            .populate( 'mascota', 'nombre' );

        generarControl( nombre, apellidos, 'actualizado una medicina a la mascota', medicina.mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La medicina de la mascota se ha actualizado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la medicina de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la medicina de la mascota.'
        } );
    }
}

const eliminarMedicinaMascota = async ( req, res ) => {
    
    const { nombre, apellidos } = req.body.usuario;
    const { idMedicina } = req.params;

    try {

        const medicina = await MedicinaMascota.findByIdAndDelete( idMedicina )
            .populate( 'mascota', 'nombre' );

        generarControl( nombre, apellidos, 'eliminado una medicina a la mascota', medicina.mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La medicina de la mascota se ha eliminado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la medicina de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la medicina de la mascota.'
        } );
    }
}

module.exports = {
    obtenerMedicinaMascota,
    obtenerMedicinaMascotaById,
    registrarMedicinaMascota,
    actualizarMedicinaMascota,
    eliminarMedicinaMascota
}