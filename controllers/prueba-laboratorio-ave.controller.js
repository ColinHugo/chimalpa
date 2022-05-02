const { PruebaLaboratorioAve } = require( '../models' );

const { generarControl } = require( '../helpers' );

const obtenerPruebasLaboratorioAves = async ( req, res ) => {

    try {

        const pruebas = await PruebaLaboratorioAve.find()
            .populate( 'ave', 'numeroAve' );

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

const obtenerPruebaLaboratorioAveById = async ( req, res ) => {

    const { idAve } = req.params;

    try {

        const prueba = await PruebaLaboratorioAve.where( { ave: idAve } )
            .populate( 'ave', 'numeroAve' );

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

const registrarPruebaLaboratorioAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idAve } = req.params;

    try {

        req.body.ave = idAve;

        const prueba = await PruebaLaboratorioAve( req.body )
            .populate( 'ave', 'numeroAve' );

        await prueba.save();

        generarControl( nombre, apellidos, 'registrado una prueba de laboratorio al ave número', prueba.ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'La prueba del ave se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la prueba de ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la prueba de ave.'
        } );
    }
}

const actualizarPruebaLaboratorioAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idPruebaLaboratorio } = req.params;
    const { ...datos } = req.body;

    try {

        const prueba = await PruebaLaboratorioAve.findByIdAndUpdate( idPruebaLaboratorio, datos )
            .populate( 'ave', 'numeroAve' );

        generarControl( nombre, apellidos, 'actualizado una prueba de laboratorio al ave número', prueba.ave.numeroAve );

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

const eliminarPruebaLaboratorioAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idPruebaLaboratorio } = req.params;

    try {

        const prueba = await PruebaLaboratorioAve.findByIdAndDelete( idPruebaLaboratorio )
            .populate( 'ave', 'numeroAve' );

        generarControl( nombre, apellidos, 'eliminado una prueba de laboratorio al ave número', prueba.ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'La prueba de laboratorio se ha eliminado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la prueba de laboratorio.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar el la prueba de laboratorio.'
        } );
    }
}

module.exports = {
    obtenerPruebasLaboratorioAves,
    obtenerPruebaLaboratorioAveById,
    registrarPruebaLaboratorioAve,
    actualizarPruebaLaboratorioAve,
    eliminarPruebaLaboratorioAve
}