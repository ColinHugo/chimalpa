const { TratamientoPermanenteMascota } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerTratamientosMascotas = async ( req, res ) => {

    try {

        const tratamientos = await TratamientoPermanenteMascota.find()
            .populate( 'mascota', 'nombre' );

        if ( tratamientos.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay tratamientos registrados.'
            } );
        }

        return res.json( {
            value: 1,
            tratamientos
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener los tratamientos permanentes.' );

        return res.json( {
            value: 0,
            msg: 'Error al obtener los tratamientos permanentes.'
        } );
    }
}

const obtenerTratamientoMascotaById = async ( req, res ) => {

    const { idMascota } = req.params;

    try {

        const tratamiento = await TratamientoPermanenteMascota.where( { mascota: idMascota } )
            .populate( 'mascota', 'nombre' );

        if ( tratamiento.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay tratamiento registrado.'
            } )
        }

        return res.json( {
            value: 1,
            tratamiento
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener el tratamiento de la mascota.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener el tratamiento de la mascota.'
        } );
    }

}

const registrarTratamientoMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idMascota } = req.params;

    try {

        req.body.mascota = idMascota;

        const tratamiento = await new TratamientoPermanenteMascota( req.body )
            .populate( 'mascota', 'nombre' );

        await tratamiento.save();

        generarControl( nombre, apellidos, 'registrado un tratamiento permanente a la mascota', tratamiento.mascota.nombre );

        return res.json( {
            value: 1,
            msg: 'El tratamiento se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar tratamiento permanente.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar tratamiento permanente.'
        } );
    }
}

const actualizarTratamientoMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idTratamiento } = req.params;
    const { ...datos } = req.body;

    try {

        const tratamiento = await TratamientoPermanenteMascota.findByIdAndUpdate( idTratamiento, datos )
            .populate( 'mascota', 'nombre' );

        generarControl( nombre, apellidos, 'actualizado un tratamiento permanente a la mascota', tratamiento.mascota.nombre );
        
        return res.json( {
            value: 1,
            msg: 'El tratamiento permanente se ha actualizado.'
        } );

    } catch ( error ) {

        console.error( 'Error al actualizar el tratamiento permanente.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el tratamiento permanente.'
        } );
    }
}

const eliminarTratamientoMascota = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idTratamiento } = req.params;

    try {

        const tratamiento = await TratamientoPermanenteMascota.findByIdAndDelete( idTratamiento )
            .populate( 'mascota', 'nombre' );

        generarControl( nombre, apellidos, 'eliminado un tratamiento permanente a la mascota', tratamiento.mascota.nombre );
        
        return res.json( {
            value: 1,
            msg: 'El tratamiento permanente se ha eliminado.'
        } );

    } catch ( error ) {

        console.error( 'Error al eliminar el tratamiento permanente.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar el tratamiento permanente.'
        } );
    }
}

module.exports = {
    obtenerTratamientosMascotas,
    obtenerTratamientoMascotaById,
    registrarTratamientoMascota,
    actualizarTratamientoMascota,
    eliminarTratamientoMascota
}