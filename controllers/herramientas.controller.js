const { Herramienta } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerHerramientas = async ( req, res ) => {

    const query = { estado: true };

    try {

        const herramientas = await Herramienta.find(  )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        if ( herramientas.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay herramientas registradas.'
            } );
        }

        return res.json( {
            value: 1,
            herramientas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las herramientas.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las herramientas.'
        } );
    }
}

const obtenerHerramientaById = async ( req, res ) => {

    const { idHerramienta } = req.params;

    try {

        const herramienta = await Herramienta.findById( idHerramienta )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        return res.json( {
            value: 1,
            herramienta
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener la herramienta con id ${ id }.` );

        return res.json( {
            value: 0,
            msg: `Error al obtener la herramienta con id ${ id }.`
        } );
    }
}

const registrarHerramienta = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    try {

        const herramienta = new Herramienta( req.body );

        await herramienta.save();

        generarControl( nombre, apellidos, 'registrado la herramienta', herramienta.tipo );

        return res.json( {
            value: 1,
            msg: 'La herramienta se ha registrado.',
            herramienta,
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la herramienta.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar la herramienta.'
        } );
    }
}

const actualizarHerramienta = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idHerramienta } = req.params;
    const { cantidad, ...datos } = req.body;

    try {

        const herramienta = await Herramienta.findByIdAndUpdate( idHerramienta, datos, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        herramienta.cantidad += cantidad;

        await herramienta.save();

        generarControl( nombre, apellidos, 'actualizado la herramienta', herramienta.tipo );

        return res.json( {
            value: 1,
            msg: 'La herramienta se ha actualizado.',
            herramienta
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la herramienta.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la herramienta.'
        } );
    }
}

const eliminarHerramienta = async ( req, res ) => {

    const { idHerramienta } = req.params;

    const { nombre, apellidos } = req.body.usuario;

    const { cantidad } = req.body;

    try {

        const herramienta = await Herramienta.findByIdAndUpdate( idHerramienta, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        Number( cantidad );
        Number( herramienta.cantidad );

        if ( isNaN( cantidad ) || isNaN( herramienta.cantidad ) ) {

            return res.json( {
                value: 0,
                msg: 'No son cantidades númericas válidas.'
            } );
        } 

        if( cantidad > herramienta.cantidad  ){

            return res.json( {
                value: 0,
                msg: 'No puedes quitar más herramientas de las que existen en inventario.'
            } );
        }
        
        herramienta.cantidad -= cantidad;

        await herramienta.save();

        generarControl( nombre, apellidos, 'eliminado la herramienta', herramienta.tipo );

        return res.json( {
            value: 1,
            msg: 'La herramienta se ha eliminado.',
            herramienta
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la herramienta.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la herramienta.'
        } );
    }
}

module.exports = {
    obtenerHerramientas,
    obtenerHerramientaById,
    registrarHerramienta,
    actualizarHerramienta,
    eliminarHerramienta
}