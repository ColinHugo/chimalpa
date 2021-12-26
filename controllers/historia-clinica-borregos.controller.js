const { HistoriaClinicaBorrego, Borrego } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerHistoriaClinicaBorregos = async ( req, res ) => {

    try {

        const historiaBorrego = await HistoriaClinicaBorrego.find()
            .populate( 'borrego', 'numeroBorrego' );

        if ( historiaBorrego.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historia de borregos que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            historiaBorrego
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la historia de los borregos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la historia de los borregos.'
        } );
    }
}

const obtenerHistoriaClinicaBorregoById = async ( req, res ) => {

    const { idBorrego } = req.params;

    try {

        const historiaBorrego = await HistoriaClinicaBorrego.where( { borrego: idBorrego } )
            .populate( 'borrego', 'numeroBorrego' );

        if ( historiaBorrego.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay historia para el borrego.'
            } );
        }

        return res.json( {
            value: 1,
            historiaBorrego
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la historia del borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la historia del borrego.'
        } );
    }
}

const registrarHistoriaClinicaBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idBorrego } = req.params;

    try {

        const borrego = await Borrego.findById( idBorrego );

        req.body.borrego = borrego;

        const historiaBorrego = await HistoriaClinicaBorrego( req.body )
            .populate( 'borrego', 'numeroBorrego' );
            
        await historiaBorrego.save();

        generarControl( nombre, apellidos, 'registrado un historial clínico al borrego', borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'La historia del caballo se ha registrado.',
            historiaBorrego
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la historia del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la historia del caballo.'
        } );
    }
}

const actualizarHistoriaClinicaBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idHistorial } = req.params;
    const { usuario, ...datos} = req.body;

    try {

        const historiaBorrego = await HistoriaClinicaBorrego.findByIdAndUpdate( idHistorial, datos, { new: true } )
            .populate( 'borrego', 'numeroBorrego' );

        const borrego = await Borrego.findById( historiaBorrego.borrego );

        generarControl( nombre, apellidos, 'actualizado un historial clínico del borrego', borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'El historial clínico del borrego se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el historial clínico del borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el historial clínico del borrego.'
        } );
    }
}

module.exports = {
    obtenerHistoriaClinicaBorregos,
    obtenerHistoriaClinicaBorregoById,
    registrarHistoriaClinicaBorrego,
    actualizarHistoriaClinicaBorrego
}