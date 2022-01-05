const { Usuario, Tarea } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerTareas = async ( req, res ) => {

    try {

        const tareas = await Tarea.find()
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        if ( tareas.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay tareas que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            tareas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las tareas.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las tareas.'
        } );
    }
}

const obtenerTareaById = async ( req, res ) => {

    const { idUsuario } = req.params;

    try {

        const tarea = await Tarea.where( { usuario: idUsuario } )
            .populate( 'usuario', [ 'nombre', 'apellidos'] );

        if ( tarea.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay tareas que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            tarea
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las tareas.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las tareas.'
        } );
    }
}

const registrarTarea = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idUsuario } = req.params;

    try {

        const usuario = await Usuario.findById( idUsuario );
        
        req.body.usuario = usuario;

        const tarea = new Tarea( req.body );

        await tarea.save();

        const datos = usuario.nombre + ' ' + usuario. apellidos;

        generarControl( nombre, apellidos, 'registrado una tarea al usuario', datos );

        return res.json( {
            value: 1,
            msg: 'La tarea se ha registrado.',
            tarea
        } );
        
    } catch ( error ) {

        console.error( 'Error al guardar la tarea.', error );

        return res.json( {
            value: 0,
            msg: 'Error al guardar la tarea.'
        } );
    }
}

const actualizarTarea = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idTarea } = req.params;
    const { ...datos } = req.body;

    try {

        const tarea = await Tarea.findByIdAndUpdate( idTarea, datos, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        const usuario = await Usuario.findById( tarea.usuario );

        generarControl( nombre, apellidos, 'actualizado una tarea al usuario', usuario.nombre );

        return res.json( {
            value: 1,
            msg: 'La tarea se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la tarea.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la tarea.'
        } );
    }
}

module.exports = {
    obtenerTareas,
    obtenerTareaById,
    registrarTarea,
    actualizarTarea
}