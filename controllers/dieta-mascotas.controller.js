const { DietaMascota } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerDietaMascotas = async ( req, res ) => {

    try {

        const dietas = await DietaMascota.find()
            .populate( 'mascota', 'nombre' )
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

        console.error( 'Error al obtener las dietas de las mascotas.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las dietas de las mascotas.'
        } );
    }
}

const obtenerDietaMascotaById = async ( req, res ) => {

    const { idMascota } = req.params;

    try {

        const dieta = await DietaMascota.where( { mascota: idMascota } )
            .populate( 'mascota', 'nombre' )
            .populate( 'usuario', [ 'nombre', 'apellidos'] );

        if ( dieta.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay dieta para la mascota.'
            } )
        }

        return res.json( {
            value: 1,
            dieta
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la dieta de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la dieta de la mascota.'
        } );
    }
}

const registrarDietaMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idMascota } = req.params;

    try {
        
        req.body.mascota = idMascota;

        const dieta = new DietaMascota( req.body )
            .populate( 'mascota', 'nombre' );

        await dieta.save()

        generarControl( nombre, apellidos, 'registrado una dieta a la mascota', dieta.mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La dieta se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al guardar la dieta de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al guardar la dieta de la mascota.'
        } );
    }
}

const actualizarDietaMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idDietaMascota } = req.params;
    const { ...datos } = req.body;

    try {

        const dietaMascota = await DietaMascota.findByIdAndUpdate( idDietaMascota, datos )
            .populate( 'mascota', 'nombre' );

        generarControl( nombre, apellidos, 'actualizado una dieta a la mascota', dietaMascota.mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La dieta de la mascota se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la dieta de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la dieta de la mascota.'
        } );
    }
}

const eliminarDietaMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idDietaMascota } = req.params;

    try {

        const dietaMascota = await DietaMascota.findByIdAndDelete( idDietaMascota )
            .populate( 'mascota', 'nombre' );

        generarControl( nombre, apellidos, 'eliminado una dieta a la mascota', dietaMascota.mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La dieta de la mascota se ha eliminado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la dieta de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la dieta de la mascota.'
        } );
    }
}

module.exports = {
    obtenerDietaMascotas,
    obtenerDietaMascotaById,
    registrarDietaMascota,
    actualizarDietaMascota,
    eliminarDietaMascota
}