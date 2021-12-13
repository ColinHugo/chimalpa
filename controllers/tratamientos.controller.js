const { Caballo, TratamientoPermanente } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerTratamientos = async ( req, res ) => {

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

const obtenerTratamientoById = async ( req, res ) => {

    const { idCaballo } = req.params;

    try {

        const tratamiento = await TratamientoPermanente.where( { caballo: idCaballo } )
            .populate( 'caballo', 'nombre' );

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

const registrarTratamiento = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCaballo } = req.params;

    try {

        const caballo = await Caballo.findById( idCaballo );

        req.body.caballo = caballo;

        const tratamiento = new TratamientoPermanente( req.body );

        await tratamiento.save();

        generarControl( nombre, apellidos, 'registrado un tratamiento permanente', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El tratamiento se ha registrado.',
            tratamiento
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar tratamiento permanente.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar tratamiento permanente.'
        } );
    }
}

const actualizarTratamiento = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idTratamiento } = req.params;
    const { ...datos } = req.body;

    try {

        const tratamiento = await TratamientoPermanente.findByIdAndUpdate( idTratamiento, datos, { new: true } );

        const caballo = await Caballo.findById( tratamiento.caballo );

        generarControl( nombre, apellidos, 'actualizado un tratamiento permanente', caballo.nombre );
        
        return res.json( {
            value: 1,
            msg: 'El tratamiento permanente se ha actualizado.',
            tratamiento
        } );

    } catch ( error ) {

        console.error( 'Error al actualizar el tratamiento permanente.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el tratamiento permanente.'
        } );
    }
}

module.exports = {
    obtenerTratamientos,
    obtenerTratamientoById,
    registrarTratamiento,
    actualizarTratamiento
}