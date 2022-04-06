const fs = require( 'fs' );
const path = require( 'path' );

const { Usuario } = require( '../models' );

const { generarUrlFotos, subirFoto } = require( '../helpers' );

const obtenerUsuarios = async ( req, res ) => {

    const query = { estado: true };

    try {

        let usuarios = await Usuario.find( query );

        if ( usuarios.length === 0 ) {

            return res.json( {
                value: 0,
                msg: 'No hay usuarios registrados.'
            } );
        }

        usuarios = generarUrlFotos( req, 'usuarios', usuarios );

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

    const { idUsuario } = req.params;

    try {

        let usuario = await Usuario.findById( idUsuario );

        usuario = generarUrlFotos( req, 'usuarios', usuario );

        return res.json( {
            value: 1,
            usuario
        } );
        
    } catch ( error ) {

        console.log( `Error al obtener el usuario con id ${ idUsuario }` );

        return res.json( {
            value: 0,
            msg: `Error al obtener el usuario con id ${ idUsuario }`
        } );
    }
}

const agregarUsuario = async ( req, res ) => {

    try {

        if ( req.body.foto ) {
            req.body.foto = await subirFoto( req.body.foto, undefined, 'usuarios' );
        }

        const usuario = new Usuario( req.body );

        await usuario.save();

        return res.json( {
            value: 1,
            msg: 'El usuario se ha registrado.'
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

    const { idUsuario } = req.params;
    const { password, foto, ...datos } = req.body;

    try {

        const usuario = await Usuario.findById( idUsuario );

        if ( password ) {
            datos.password = await Usuario.encryptPassword( password );
        }

        if ( foto ) {
            if ( usuario.foto ) {
                const pathImagen = path.join( __dirname, '../uploads/usuarios/', usuario.foto );

                if ( fs.existsSync( pathImagen ) ) {
                    fs.unlinkSync( pathImagen );
                }
            }

            datos.foto = await subirFoto( req.body.foto, undefined, 'usuarios' );
        }

        await usuario.updateOne( datos );

        return res.json( {
            value: 1,
            msg: 'El usuario se ha actualizado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el usuario.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el usuario.'
        } );
    }
}

const eliminarUsuario = async ( req, res ) => {

    const { idUsuario } = req.params;

    try {

        const usuario = await Usuario.findById( idUsuario );

        if ( usuario.foto ) {
            
            const pathImagen = path.join( __dirname, '../uploads/usuarios/', usuario.foto );

            if ( fs.existsSync( pathImagen ) ){
                fs.unlinkSync( pathImagen );
            }
        }

        usuario.estado = false;
        usuario.foto = '';

        await usuario.save();

        return res.json( {
            value: 1,
            msg: 'El usuario se ha eliminado.'
        } );
            
    } catch ( error ) {
        
        console.error( 'Error al borrar el usuario.', error );

        return res.json( {
            value: 0,
            msg: 'Error al borrar el usuario.'
        } );
    }
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioById,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario
}