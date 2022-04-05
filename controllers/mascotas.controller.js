const fs = require( 'fs' );
const path = require( 'path' );

const { Mascota } = require( '../models' );

const { generarControl, generarUrlFotos, subirFoto } = require( '../helpers' );

const obtenerMascotas = async ( req, res ) => {

    const query = { estado: true };

    try {

        let mascotas = await Mascota.find( query )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        if ( mascotas.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay mascotas registrados.'
            } );
        }

        mascotas = generarUrlFotos( req, 'mascotas', mascotas );

        return res.json( {
            value: 1,
            mascotas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener a las mascotas.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener a las mascotas.'
        } );
    }
}

const obtenerMascotaById = async ( req, res ) => {

    const { idMascota } = req.params;

    try {

        let mascota = await Mascota.findById( idMascota )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        mascota = generarUrlFotos( req, 'mascotas', mascota );

        return res.json( {
            value: 1,
            mascota
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener la mascota con id ${ idMascota }.` );

        return res.json( {
            value: 0,
            msg: `Error al obtener la mascota con id ${ idMascota }.`
        } );
    }
}

const registrarMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    try {

        if ( req.body.foto ) {
            req.body.foto = await subirFoto( req.body.foto, undefined, 'mascotas' );
        }

        const mascota = new Mascota( req.body );

        await mascota.save();

        generarControl( nombre, apellidos, 'registrado a la mascota', mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La mascota se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar a la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar a la mascota.'
        } );
    }
}

const actualizarMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idMascota } = req.params;
    const { foto, ...datos } = req.body;

    try {

        const mascota = await Mascota.findById( idMascota );

        if ( foto ) {
            if ( mascota.foto ) {
                const pathImagen = path.join( __dirname, '../uploads/mascotas/', mascota.foto );

                if ( fs.existsSync( pathImagen ) ) {
                    fs.unlinkSync( pathImagen );
                }
            }

            datos.foto = await subirFoto( req.body.foto, undefined, 'mascotas' );
        }

        await mascota.updateOne( datos );

        generarControl( nombre, apellidos, 'actualizado a la mascota', mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La mascota se ha actualizado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar a la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar a la mascota.'
        } );
    }
}

const eliminarMascota = async ( req, res ) => {

    const { idMascota } = req.params;

    const { nombre, apellidos } = req.body.usuario;

    try {

        const mascota = await Mascota.findByIdAndUpdate( idMascota, { estado: false } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        generarControl( nombre, apellidos, 'eliminado a la mascota', mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La mascota se ha eliminado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar a la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar a la mascota.'
        } );
    }
}

module.exports = {
    obtenerMascotas,
    obtenerMascotaById,
    registrarMascota,
    actualizarMascota,
    eliminarMascota
}