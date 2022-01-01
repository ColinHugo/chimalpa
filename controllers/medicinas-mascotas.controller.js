const { Mascota, MedicinaMascota } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

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
    const { tipo, descripcion, fecha } = req.body;

    try {

        const mascota = await Mascota.findById( idMascota );

        const medicina = await MedicinaMascota( { tipo, descripcion, fecha, mascota } )
            .populate( 'mascota', 'nombre' );

        await medicina.save();

        generarControl( nombre, apellidos, 'registrado una medicina a la mascota', mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La medicina de la mascota se ha registrado.',
            medicina,
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

        const medicina = await MedicinaMascota.findByIdAndUpdate( idMedicina, datos, { new: true } )
            .populate( 'mascota', 'nombre' );

        const mascota = await Mascota.findById( medicina.mascota );

        generarControl( nombre, apellidos, 'actualizado una medicina a la mascota', mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La medicina de la mascota se ha actualizado.',
            medicina
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la medicina de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la medicina de la mascota.'
        } );
    }
}

module.exports = {
    obtenerMedicinaMascota,
    obtenerMedicinaMascotaById,
    registrarMedicinaMascota,
    actualizarMedicinaMascota
}