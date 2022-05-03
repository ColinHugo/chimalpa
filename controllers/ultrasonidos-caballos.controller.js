const { UltrasonidoCaballo } = require( '../models' );

const { generarControl, generarUrlFotosUltrasonidos, subirFoto } = require( '../helpers' );

const obtenerUltrasonidoCaballoById = async ( req, res ) => {

    const { idMonta } = req.params;

    try {

        let ultrasonido = await UltrasonidoCaballo.where( { monta: idMonta } )
            .populate( 'monta', 'yegua' );

        if ( ultrasonido.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay ultrasonidos registrados.'
            } );
        }

        ultrasonido = generarUrlFotosUltrasonidos( req, 'ultrasonidos', ultrasonido );

        return res.json( {
            value: 1,
            ultrasonido
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener el ultrasonido.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener el ultrasonido.'
        } );
    }
}

const registrarUltraSonidoCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idMonta } = req.params;

    const { fotoOvarioDerecho, fotoOvarioIzquierdo, fotoUltraSonido, ...datos } = req.body;

    try {
        
        datos.monta = idMonta;

        if ( fotoOvarioDerecho ) {
            datos.fotoOvarioDerecho = await subirFoto( fotoOvarioDerecho, undefined, 'ultrasonidos' );
        }

        if ( fotoOvarioIzquierdo ) {
            datos.fotoOvarioIzquierdo = await subirFoto( fotoOvarioIzquierdo, undefined, 'ultrasonidos' );
        }

        if ( fotoUltraSonido ) {
            datos.fotoUltraSonido = await subirFoto( fotoUltraSonido, undefined, 'ultrasonidos' );
        }

        const ultrasonido = await new UltrasonidoCaballo( datos )
            .populate( 'monta', 'yegua' );

        await ultrasonido.save();

        generarControl( nombre, apellidos, 'registrado un ultrasonido a la yegua', ultrasonido.monta.yegua );

        return res.json( {
            value: 1,
            msg: 'El ultrasonido se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el ultrasonido.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar el ultrasonido.'
        } );
    }
}

const eliminarUltraSonidoCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idUltraSonido } = req.params;

    try {

        const ultraSonido = await UltrasonidoCaballo.findById( idUltraSonido );

        if ( ultraSonido.fotoOvarioDerecho ) {
            const pathImagen = path.join( __dirname, '../uploads/', 'ultrasonidos', ultraSonido.fotoOvarioDerecho );

            if ( fs.existsSync( pathImagen ) ){
                fs.unlinkSync( pathImagen );
            }
        }

        if ( ultraSonido.fotoOvarioIzquierdo ) {
            const pathImagen = path.join( __dirname, '../uploads/', 'ultrasonidos', ultraSonido.fotoOvarioIzquierdo );

            if ( fs.existsSync( pathImagen ) ){
                fs.unlinkSync( pathImagen );
            }
        }

        if ( ultraSonido.fotoUltraSonido ) {
            const pathImagen = path.join( __dirname, '../uploads/', 'ultrasonidos', ultraSonido.fotoUltraSonido );

            if ( fs.existsSync( pathImagen ) ){
                fs.unlinkSync( pathImagen );
            }
        }

        await ultraSonido.deleteOne();

        generarControl( nombre, apellidos, 'eliminado un ultrasonido a la yegua', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El ultrasonido se ha registrado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el ultrasonido.', error );

        return res.json( {
            value: 0,
            msg: 'Error al registrar el ultrasonido.'
        } );
    }
}

module.exports = {
    obtenerUltrasonidoCaballoById,
    registrarUltraSonidoCaballo,
    eliminarUltraSonidoCaballo
}