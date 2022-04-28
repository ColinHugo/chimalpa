const { TratamientoPermanenteBorrego } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerTratamientosBorregos = async ( req, res ) => {

    try {

        const tratamientos = await TratamientoPermanenteBorrego.find()
            .populate( 'borrego', 'numeroBorrego' );

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

const obtenerTratamientoBorregoById = async ( req, res ) => {

    const { idBorrego } = req.params;

    try {

        const tratamiento = await TratamientoPermanenteBorrego.where( { borrego: idBorrego } )
            .populate( 'borrego', 'numeroBorrego' );

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

        console.error( 'Error al obtener el tratamiento del borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener el tratamiento del borrego.'
        } );
    }
}

const registrarTratamientoBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idBorrego } = req.params;

    try {

        req.body.borrego = idBorrego;

        const tratamiento = await new TratamientoPermanenteBorrego( req.body )
            .populate( 'borrego', 'numeroBorrego' );

        await tratamiento.save();

        generarControl( nombre, apellidos, 'registrado un tratamiento permanente al borrego número',
                        tratamiento.borrego.numeroBorrego );

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

const actualizarTratamientoBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idTratamiento } = req.params;
    const { ...datos } = req.body;

    try {

        const tratamiento = await TratamientoPermanenteBorrego.findByIdAndUpdate( idTratamiento, datos )
            .populate( 'borrego', 'numeroBorrego' );

        generarControl( nombre, apellidos, 'actualizado un tratamiento permanente al borrego número', 
                        tratamiento.borrego.numeroBorrego );
        
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

const eliminarTratamientoBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idTratamiento } = req.params;

    try {

        const tratamiento = await TratamientoPermanenteBorrego.findByIdAndDelete( idTratamiento )
            .populate( 'borrego', 'numeroBorrego' );

        generarControl( nombre, apellidos, 'eliminado un tratamiento permanente al borrego número', 
                        tratamiento.borrego.numeroBorrego );
        
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
    obtenerTratamientosBorregos,
    obtenerTratamientoBorregoById,
    registrarTratamientoBorrego,
    actualizarTratamientoBorrego,
    eliminarTratamientoBorrego
}