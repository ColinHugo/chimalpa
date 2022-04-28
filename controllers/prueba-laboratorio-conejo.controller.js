const { PruebaLaboratorioConejo } = require( '../models' );

const { generarControl } = require( '../helpers' );

const obtenerPruebasLaboratorioConejos = async ( req, res ) => {

    try {

        const pruebas = await PruebaLaboratorioConejo.find()
            .populate( 'conejo', 'numeroConejo' );

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

const obtenerPruebaLaboratorioConejoById = async ( req, res ) => {

    const { idConejo } = req.params;

    try {

        const prueba = await PruebaLaboratorioConejo.where( { conejo: idConejo } )
            .populate( 'conejo', 'numeroConejo' );

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

        console.error( `Error al obtener la prueba de laboratorio. ${ error }` );

        return res.json( {
            value: 0,
            msg: `Error al obtener la prueba de laboratorio.`
        } );
    }
}

const registrarPruebaLaboratorioConejo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idConejo } = req.params;

    try {

        req.body.conejo = idConejo;

        const prueba = await PruebaLaboratorioConejo( req.body )
            .populate( 'conejo', 'numeroConejo' );

        await prueba.save();

        generarControl( nombre, apellidos, 'registrado una prueba de laboratorio al conejo número', 
                        prueba.conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'La prueba del conejo se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la prueba de conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la prueba de conejo.'
        } );
    }
}

const actualizarPruebaLaboratorioConejo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idPruebaLaboratorio } = req.params;
    const { ...datos } = req.body;

    try {

        const prueba = await PruebaLaboratorioConejo.findByIdAndUpdate( idPruebaLaboratorio, datos )
            .populate( 'conejo', 'numeroConejo' );

        generarControl( nombre, apellidos, 'actualizado una prueba de laboratorio al conejo número', 
                        prueba.conejo.numeroConejo );

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

const eliminarPruebaLaboratorioConejo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idPruebaLaboratorio } = req.params;

    try {

        const prueba = await PruebaLaboratorioConejo.findByIdAndDelete( idPruebaLaboratorio )
            .populate( 'conejo', 'numeroConejo' );

        generarControl( nombre, apellidos, 'eliminado una prueba de laboratorio al conejo número', 
                        prueba.conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'La prueba de laboratorio se ha eliminado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la prueba de laboratorio.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el la prueba de laboratorio.'
        } );
    }
}

module.exports = {
    obtenerPruebasLaboratorioConejos,
    obtenerPruebaLaboratorioConejoById,
    registrarPruebaLaboratorioConejo,
    actualizarPruebaLaboratorioConejo,
    eliminarPruebaLaboratorioConejo
}