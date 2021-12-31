const { PerroGato } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerMascotas = async ( req, res ) => {

    const query = { estado: true };

    try {

        const mascotas = await PerroGato.find( query )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        if ( mascotas.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay mascotas registrados.'
            } );
        }

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

        const mascota = await PerroGato.findById( idMascota )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        return res.json( {
            value: 1,
            mascota
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener la mascota con id ${ id }.` );

        return res.json( {
            value: 0,
            msg: `Error al obtener la mascota con id ${ id }.`
        } );
    }
}

const registrarMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    try {

        const mascota = new PerroGato( req.body );

        await mascota.save();

        generarControl( nombre, apellidos, 'registrado a la mascota', mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La mascota se ha registrado.',
            mascota,
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
    const { ...datos } = req.body;

    try {

        const mascota = await PerroGato.findByIdAndUpdate( idMascota, datos, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        generarControl( nombre, apellidos, 'actualizado a la mascota', mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La mascota se ha actualizado.',
            mascota
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

        const mascota = await PerroGato.findByIdAndUpdate( idMascota, { estado: false }, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        generarControl( nombre, apellidos, 'eliminado a la mascota', mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La mascota se ha eliminado.',
            mascota
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