const fs = require( 'fs' );
const path = require( 'path' );

const { Caballo, RondinCaballo } = require( '../models' );

const { generarControl, generarUrlFotosRondines, subirFoto } = require( '../helpers' );

const obtenerRondinById = async ( req, res ) => {

    let { idCaballo } = req.params;

    try {

        let rondin = await RondinCaballo.where( { caballo: idCaballo } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] )
            .populate( 'caballo', [ 'nombre' , 'foto'] );

        if ( rondin.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay rondines que mostrar.'
            } );
        }

        rondin = generarUrlFotosRondines( req, 'rondines', rondin );

        return res.json( {
            value: 1,
            rondin
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener los rondines del caballo con id ${ idCaballo }. ${ error }` );

        return res.json( {
            value: 0,
            msg: `Error al obtener los rondines del caballo con id ${ idCaballo }.`
        } );
    }
}

const obtenerRondinByIdDate = async ( req, res ) => {

    let { idCaballo, desde } = req.params;

    desde = desde.substring( 0, 10 );

    try {

        let rondin = await RondinCaballo.where( { caballo: idCaballo,
            createdAt: {
                $gte: desde
            }
        } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] )
            .populate( 'caballo', [ 'nombre' , 'foto'] );

        if ( rondin.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay rondines que mostrar.'
            } );
        }

        rondin = generarUrlFotosRondines( req, 'rondines', rondin );

        return res.json( {
            value: 1,
            rondin
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener los rondines del caballo con id ${ idCaballo }. ${ error }` );

        return res.json( {
            value: 0,
            msg: `Error al obtener los rondines del caballo con id ${ idCaballo }.`
        } );
    }
}

const registrarRondin = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCaballo } = req.params;

    try {

        const caballo = await Caballo.findById( idCaballo );
        req.body.caballo = caballo;

        if ( req.body.fotoAgua ) {
            req.body.fotoAgua = await subirFoto( req.body.fotoAgua, undefined, 'rondines' );
        }

        if ( req.body.fotoComida ) {
            req.body.fotoComida = await subirFoto( req.body.fotoComida, undefined, 'rondines' );
        }

        if ( req.body.fotoHece ) {
            req.body.fotoHece = await subirFoto( req.body.fotoHece, undefined, 'rondines' );
        }

        const rondin = await new RondinCaballo( req.body );

        await rondin.save();

        generarControl( nombre, apellidos, 'registrado un rondín al caballo', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El rondín se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el rondín del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar el rondín del caballo.'
        } );
    }
}

const actualizarRondinCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idRondin } = req.params;
    const { fotoAgua, fotoComida, fotoHece, ...datos } = req.body;

    try {

        const rondin = await RondinCaballo.findById( idRondin )
            .populate( 'caballo', 'nombre' );

        if ( fotoAgua  ) {
            if ( rondin.fotoAgua ) {
                const pathImagen = path.join( __dirname, '../uploads/rondines/', rondin.fotoAgua );

                if ( fs.existsSync( pathImagen ) ) {
                    fs.unlinkSync( pathImagen );
                }
            }
            datos.fotoAgua = await subirFoto( fotoAgua, undefined, 'rondines' );
        }

        if ( fotoComida  ) {
            if ( rondin.fotoComida ) {
                const pathImagen = path.join( __dirname, '../uploads/rondines/', rondin.fotoComida );

                if ( fs.existsSync( pathImagen ) ) {
                    fs.unlinkSync( pathImagen );
                }
            }
            datos.fotoComida = await subirFoto( fotoComida, undefined, 'rondines' );
        }

        if ( fotoHece  ) {
            if ( rondin.fotoHece ) {
                const pathImagen = path.join( __dirname, '../uploads/rondines/', rondin.fotoHece );

                if ( fs.existsSync( pathImagen ) ) {
                    fs.unlinkSync( pathImagen );
                }
            }
            datos.fotoHece = await subirFoto( fotoHece, undefined, 'rondines' );
        }

        await rondin.updateOne( datos );

        generarControl( nombre, apellidos, 'actualizado un rondín al caballo', rondin.caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El rondín se ha actualizado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el rondín.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el rondín.'
        } );
    }
}

const eliminarRondinCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;

    const { idRondin } = req.params;

    try {

        const rondin = await RondinCaballo.findById( idRondin )
            .populate( 'caballo', 'nombre' );
        
        if ( rondin.fotoAgua ) {
            const pathImagen = path.join( __dirname, '../uploads/rondines/', rondin.fotoAgua );

            if ( fs.existsSync( pathImagen ) ) {
                fs.unlinkSync( pathImagen );
            }
        }
        
        if ( rondin.fotoComida ) {
            const pathImagen = path.join( __dirname, '../uploads/rondines/', rondin.fotoComida );

            if ( fs.existsSync( pathImagen ) ) {
                fs.unlinkSync( pathImagen );
            }
        }
        
        if ( rondin.fotoHece ) {
            const pathImagen = path.join( __dirname, '../uploads/rondines/', rondin.fotoHece );

            if ( fs.existsSync( pathImagen ) ) {
                fs.unlinkSync( pathImagen );
            }
        }

        await rondin.deleteOne();

        generarControl( nombre, apellidos, 'eliminado un rondín al caballo', rondin.caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El rondín se ha eliminado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminado el rondín.', error );

        return res.json( {
            value: 0,
            msg: 'Error al eliminado el rondín.'
        } );
    }
}

module.exports = {
    obtenerRondinById,
    obtenerRondinByIdDate,
    registrarRondin,
    actualizarRondinCaballo,
    eliminarRondinCaballo
}