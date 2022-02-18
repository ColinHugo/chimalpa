const { Caballo, TratamientoEventualCaballo } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerTratamientoEventualCaballoById = async ( req, res ) => {

    const { idCaballo } = req.params;

    try {

        const tratamiento = await TratamientoEventualCaballo.where( { caballo: idCaballo } )
            .populate( 'usuario', [ 'nombre', 'apellidos'] )
            .populate( 'caballo', 'nombre' );

        if ( tratamiento.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay tratamiento eventual registrado.'
            } )
        }

        return res.json( {
            value: 1,
            tratamiento
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener el tratamiento eventual del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener el tratamiento eventual del caballo.'
        } );
    }

}

const registrarTratamientoEventualCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCaballo } = req.params;

    try {

        const caballo = await Caballo.findById( idCaballo );

        req.body.caballo = caballo;

        const tratamiento = new TratamientoEventualCaballo( req.body );

        await tratamiento.save();

        generarControl( nombre, apellidos, 'registrado un tratamiento eventual al caballo', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El tratamiento eventual se ha registrado.',
            tratamiento
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el tratamiento eventual.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar el tratamiento eventual.'
        } );
    }
}

const actualizarTratamientoEventualCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idTratamiento } = req.params;
    const { ...datos } = req.body;

    try {

        const tratamiento = await TratamientoEventualCaballo.findByIdAndUpdate( idTratamiento, datos, { new: true } );

        const caballo = await Caballo.findById( tratamiento.caballo );

        generarControl( nombre, apellidos, 'actualizado un tratamiento eventual al caballo', caballo.nombre );
        
        return res.json( {
            value: 1,
            msg: 'El tratamiento eventual se ha actualizado.',
            tratamiento
        } );

    } catch ( error ) {

        console.error( 'Error al actualizar el tratamiento eventual.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el tratamiento eventual.'
        } );
    }
}

const eliminarTratamientoEventualCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idTratamiento } = req.params;

    try {

        const tratamiento = await TratamientoEventualCaballo.findByIdAndDelete( idTratamiento );

        const caballo = await Caballo.findById( tratamiento.caballo );

        generarControl( nombre, apellidos, 'eliminado un tratamiento eventual al caballo', caballo.nombre );
        
        return res.json( {
            value: 1,
            msg: 'El tratamiento eventual se ha eliminado.',
        } );

    } catch ( error ) {

        console.error( 'Error al eliminar el tratamiento eventual.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar el tratamiento eventual.'
        } );
    }
}

module.exports = {
    obtenerTratamientoEventualCaballoById,
    registrarTratamientoEventualCaballo,
    actualizarTratamientoEventualCaballo,
    eliminarTratamientoEventualCaballo
}