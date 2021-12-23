const { Borrego, Caballo, TratamientoPermanenteBorrego, TratamientoPermanente } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

// ****************************************************
// - End points para los tratamientos de los caballos -
// ****************************************************

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

const actualizarTratamientoCaballo = async ( req, res ) => {

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

// ****************************************************
// - End points para los tratamientos de los borregos -
// ****************************************************

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

        const borrego = await Borrego.findById( idBorrego );

        req.body.borrego = borrego;

        const tratamiento = new TratamientoPermanenteBorrego( req.body );

        await tratamiento.save();

        generarControl( nombre, apellidos, 'registrado un tratamiento permanente al borrego', borrego.numeroBorrego );

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

const actualizarTratamientoBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idTratamiento } = req.params;
    const { ...datos } = req.body;

    try {

        const tratamiento = await TratamientoPermanenteBorrego.findByIdAndUpdate( idTratamiento, datos, { new: true } );

        const borrego = await Borrego.findById( tratamiento.borrego );

        generarControl( nombre, apellidos, 'actualizado un tratamiento permanente al borrego', borrego.numeroBorrego );
        
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

    // Tratamientos de los caballos
    obtenerTratamientosCaballos,
    obtenerTratamientoCaballoById,
    registrarTratamientoCaballo,
    actualizarTratamientoCaballo,

    //Tratamientos de los borregos
    obtenerTratamientosBorregos,
    obtenerTratamientoBorregoById,
    registrarTratamientoBorrego,
    actualizarTratamientoBorrego,
}