const { TratamientoPermanente } = require( '../models' );

const { generarControl } = require( '../helpers' );

const obtenerTratamientosCaballos = async ( req, res ) => {

    try {

        const tratamientos = await TratamientoPermanente.find()
            .populate( 'caballo', 'nombre' );

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

const obtenerTratamientoCaballoById = async ( req, res ) => {

    const { idCaballo } = req.params;

    try {

        const tratamiento = await TratamientoPermanente.where( { caballo: idCaballo } )
            .populate( 'caballo', 'nombre' );

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

        console.error( 'Error al obtener el tratamiento del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener el tratamiento del caballo.'
        } );
    }

}

const registrarTratamientoCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCaballo } = req.params;

    try {

        req.body.caballo = idCaballo;

        const tratamiento = await new TratamientoPermanente( req.body )
            .populate( 'caballo', 'nombre' );

        await tratamiento.save();

        generarControl( nombre, apellidos, 'registrado un tratamiento permanente al caballo', tratamiento.caballo.nombre );

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

const actualizarTratamientoCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idTratamiento } = req.params;
    const { ...datos } = req.body;

    try {

        const tratamiento = await TratamientoPermanente.findByIdAndUpdate( idTratamiento, datos )
            .populate( 'caballo', 'nombre' );

        generarControl( nombre, apellidos, 'actualizado un tratamiento permanente al caballo', tratamiento.caballo.nombre );
        
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

const eliminarTratamientoCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idTratamiento } = req.params;

    try {

        const tratamiento = await TratamientoPermanente.findByIdAndDelete( idTratamiento )
            .populate( 'caballo', 'nombre' );

        generarControl( nombre, apellidos, 'eliminado un tratamiento permanente al caballo', tratamiento.caballo.nombre );
        
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
    obtenerTratamientosCaballos,
    obtenerTratamientoCaballoById,
    registrarTratamientoCaballo,
    actualizarTratamientoCaballo,
    eliminarTratamientoCaballo
}