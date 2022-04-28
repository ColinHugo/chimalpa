const { PruebaLaboratorioBorrego } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerPruebasLaboratorioBorregos = async ( req, res ) => {

    try {

        const pruebas = await PruebaLaboratorioBorrego.find()
            .populate( 'borrego', 'numeroBorrego' );

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

const obtenerPruebaLaboratorioBorregoById = async ( req, res ) => {

    const { idBorrego } = req.params;

    try {

        const prueba = await PruebaLaboratorioBorrego.where( { borrego: idBorrego } )
            .populate( 'borrego', 'numeroBorrego' );

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

const registrarPruebaLaboratorioBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idBorrego } = req.params;

    try {

        req.body.borrego = idBorrego;

        const prueba = await PruebaLaboratorioBorrego( req.body )
            .populate( 'borrego', 'numeroBorrego' );

        await prueba.save();

        generarControl( nombre, apellidos, 'registrado una prueba de laboratorio al borrego número', 
                        prueba.borrego.numeroBorrego );

        return res.json( {
            value: 1,
            msg: 'La prueba del borrego se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la prueba de borrego.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la prueba de borrego.'
        } );
    }
}

const actualizarPruebaLaboratorioBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idPruebaLaboratorio } = req.params;
    const { ...datos } = req.body;

    try {

        const prueba = await PruebaLaboratorioBorrego.findByIdAndUpdate( idPruebaLaboratorio, datos )
            .populate( 'borrego', 'numeroBorrego' );

        generarControl( nombre, apellidos, 'actualizado una prueba de laboratorio al borrego número', 
                        prueba.borrego.numeroBorrego );

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

const eliminarPruebaLaboratorioBorrego = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idPruebaLaboratorio } = req.params;

    try {

        const prueba = await PruebaLaboratorioBorrego.findByIdAndDelete( idPruebaLaboratorio )
            .populate( 'borrego', 'numeroBorrego' );

        generarControl( nombre, apellidos, 'eliminado una prueba de laboratorio al borrego número', 
                        prueba.borrego.numeroBorrego );

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
    obtenerPruebasLaboratorioBorregos,
    obtenerPruebaLaboratorioBorregoById,
    registrarPruebaLaboratorioBorrego,
    actualizarPruebaLaboratorioBorrego,
    eliminarPruebaLaboratorioBorrego
}