const { Tarea } = require( '../models' );

const { generarControl } = require( '../helpers' );

const obtenerTareas = async ( req, res ) => {

    let { estado } = req.params;

    ( estado === "true" ) ? estado = true : estado = false;

    try {

        const tareas = await Tarea.where( { estado } )
            .populate( 'encargado', [ 'nombre', 'apellidos'] )
            .populate( 'empleado', [ 'nombre', 'apellidos'] );

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

    const { idEmpleado } = req.params;

    let { estado } = req.params;

    ( estado === "true" ) ? estado = true : estado = false;

    try {

        const tarea = await Tarea.where( { empleado: idEmpleado, estado } )
            .populate( 'encargado', [ 'nombre', 'apellidos' ] )
            .populate( 'empleado', [ 'nombre', 'apellidos' ] );

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
    const { idEmpleado } = req.params;

    try {
        
        req.body.encargado = req.body.usuario;
        req.body.empleado = idEmpleado;

        const tarea = await new Tarea( req.body )
            .populate( 'empleado', [ 'nombre', 'apellidos' ] );

        await tarea.save();

        const nombreCompleto = tarea.empleado.nombre + ' ' + tarea.empleado.apellidos;

        generarControl( nombre, apellidos, `registrado la tarea ${ tarea.nombre } al usuario`, nombreCompleto );

        return res.json( {
            value: 1,
            msg: 'La tarea se ha registrado.'
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

        const tarea = await Tarea.findByIdAndUpdate( idTarea, datos )
            .populate( 'encargado', [ 'nombre', 'apellidos'] )
            .populate( 'empleado', [ 'nombre', 'apellidos'] );

        const nombreCompleto = tarea.empleado.nombre + ' ' + tarea.empleado. apellidos;

        generarControl( nombre, apellidos, `actualizado la tarea ${ tarea.nombre } al usuario`, nombreCompleto );

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

const eliminarTarea = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idTarea } = req.params;

    try {

        const tarea = await Tarea.findByIdAndDelete( idTarea )
            .populate( 'empleado', [ 'nombre', 'apellidos'] );

        const nombreCompleto = tarea.empleado.nombre + ' ' + tarea.empleado.apellidos;

        generarControl( nombre, apellidos, `eliminado la tarea ${ tarea.nombre } al usuario`, nombreCompleto );

        return res.json( {
            value: 1,
            msg: 'La tarea se ha eliminado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la tarea.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminar la tarea.'
        } );
    }
}

module.exports = {
    obtenerTareas,
    obtenerTareaById,
    registrarTarea,
    actualizarTarea,
    eliminarTarea
}