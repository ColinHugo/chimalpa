const { Usuario } = require( '../models' );

const obtenerUsuarios = async ( req, res ) => {

    const query = { estado: true };

    try {

        const usuarios = await Usuario.find( query );

        if ( usuarios.length === 0 ) {

            return res.json( {
                value: 0,
                msg: 'No hay usuarios registrados.'
            } );
        }

        return res.json( {
            value: 1,
            usuarios
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener a los usuarios.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener a los usuarios.'
        } );
    }
}

const obtenerUsuarioById = async ( req, res ) => {

    const { id } = req.params;

    try {

        const usuario = await Usuario.findById( id );

        return res.json( {
            value: 1,
            usuario
        } );
        
    } catch ( error ) {

        console.log( `Error al obtener el usuario con id ${ id }` );

        return res.json( {
            value: 0,
            msg: `Error al obtener el usuario con id ${ id }`
        } );
    }
}

const agregarUsuario = async ( req, res ) => {

    const { nombre, apellidos, correo, password } = req.body;

    try {

        const usuario = new Usuario( {
            nombre,
            apellidos,
            correo,
            password: await Usuario.encryptPassword( password )
        } );

        await usuario.save();

        return res.json( {
            value: 1,
            msg: 'El usuario se ha registrado.',
            usuario
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar al usuario.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar al usuario.'
        } );
    }
}

const actualizarUsuario = async ( req, res ) => {

    const { id } = req.params;
    const { ...datos } = req.body;

    try {

        const usuario = await Usuario.findByIdAndUpdate( id, datos, { new: true } );

        return res.json( {
            value: 1,
            msg: 'El usuario se ha actualizado.',
            usuario
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el usuario.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el usuario.'
        } );
    }}

    const eliminarUsuario = async ( req, res ) => {

        const { id } = req.params;
    
        try {
    
            const usuario = await Usuario.findByIdAndUpdate( id, { estado: false }, { new: true } );
    
            return res.json( {
                value: 1,
                msg: 'El usuario se ha eliminado.',
                usuario
            } );
            
        } catch ( error ) {
    
            console.error( 'Error al borrar el usuario.', error );
    
            return res.json( {
                value: 0,
                msg: 'Error al borrar el usuario.'
            } );
        }}

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioById,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario
}