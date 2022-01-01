const { Mascota, PruebaLaboratorioMascota } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerPruebasLaboratorioMascotas = async ( req, res ) => {

    try {

        const pruebas = await PruebaLaboratorioMascota.find()
            .populate( 'mascota', 'nombre' );

        if ( pruebas.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay pruebas de laboratorio registradas.'
            } );
        }

        return res.json( {
            value: 1,
            pruebas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las pruebas de laboratorio.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener a las pruebas de laboratorio.'
        } );
    }
}

const obtenerPruebaLaboratorioMascotaById = async ( req, res ) => {

    const { idMascota } = req.params;

    try {

        const prueba = await PruebaLaboratorioMascota.where( { mascota: idMascota } )
            .populate( 'mascota', 'nombre' );

        if ( prueba.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay prueba de laboratorio.'
            } );
        }

        return res.json( {
            value: 1,
            prueba
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener la prueba de laboratorio.` );

        return res.json( {
            value: 0,
            msg: `Error al obtener la prueba de laboratorio.`
        } );
    }
}

const registrarPruebaLaboratorioMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idMascota } = req.params;

    try {

        const mascota = await Mascota.findById( idMascota );

        req.body.mascota = mascota;

        const prueba = await PruebaLaboratorioMascota( req.body )
            .populate( 'mascota', 'nombre' );

        await prueba.save();

        generarControl( nombre, apellidos, 'registrado una prueba de laboratorio a al mascota', mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La prueba de la mascota se ha registrado.',
            prueba
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la prueba de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la prueba de la mascota.'
        } );
    }
}

const actualizarPruebaLaboratorioMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idPruebaLaboratorio } = req.params;
    const { ...datos } = req.body;

    try {

        const prueba = await PruebaLaboratorioMascota.findByIdAndUpdate( idPruebaLaboratorio, datos, { new: true } )
            .populate( 'mascota', 'nombre' );

        const mascota = await Mascota.findById( prueba.mascota );

        generarControl( nombre, apellidos, 'actualizado una prueba de laboratorio a la mascota', mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'La prueba de laboratorio se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la prueba de laboratorio.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el la prueba de laboratorio.'
        } );
    }
}

module.exports = {
    obtenerPruebasLaboratorioMascotas,
    obtenerPruebaLaboratorioMascotaById,
    registrarPruebaLaboratorioMascota,
    actualizarPruebaLaboratorioMascota
}