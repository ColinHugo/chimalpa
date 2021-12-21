const { Caballo, PruebasLaboratorio } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerPruebasLaboratoriosCaballos = async ( req, res ) => {

    try {

        const pruebas = await PruebasLaboratorio.find()
            .populate( 'caballo', 'nombre' );

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

const obtenerPruebaLaboratorioCaballoById = async ( req, res ) => {

    const { idCaballo } = req.params;

    try {

        const prueba = await PruebasLaboratorio.where( { caballo: idCaballo } )
            .populate( 'caballo', 'nombre' );

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

const registrarPruebaLaboratorioCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCaballo } = req.params;

    try {

        const caballo = await Caballo.findById( idCaballo );

        req.body.caballo = caballo;

        const prueba = await PruebasLaboratorio( req.body )
            .populate( 'caballo', 'nombre' );

        await prueba.save();

        generarControl( nombre, apellidos, 'registrado una prueba de laboratorio', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'La prueba del caballo se ha registrado.',
            prueba
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la prueba de caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la prueba de caballo.'
        } );
    }
}

const actualizarPruebaLaboratorioCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idPruebaLaboratorio } = req.params;
    const { ...datos } = req.body;

    try {

        const prueba = await PruebasLaboratorio.findByIdAndUpdate( idPruebaLaboratorio, datos, { new: true } )
            .populate( 'caballo', 'nombre' );

        const caballo = await Caballo.findById( prueba.caballo );

        generarControl( nombre, apellidos, 'actualizado una prueba de laboratorio', caballo.nombre );

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
    obtenerPruebasLaboratoriosCaballos,
    obtenerPruebaLaboratorioCaballoById,
    registrarPruebaLaboratorioCaballo,
    actualizarPruebaLaboratorioCaballo
}