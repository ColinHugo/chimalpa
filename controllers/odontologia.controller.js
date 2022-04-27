const { Odontologia } = require( '../models' );

const { generarControl } = require( '../helpers' );

const obtenerOdontologiaCaballos = async ( req, res ) => {

    try {

        const odontologia = await Odontologia.find()
            .populate( 'caballo', 'nombre' );

        if ( odontologia.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay registros de odontologia que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            odontologia
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener los registros de odontologia.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener los registros de odontologia.'
        } );
    }
}

const obtenerOdontologiaCaballoById = async ( req, res ) => {

    const { idCaballo } = req.params;

    try {

        const odontologia = await Odontologia.where( { caballo: idCaballo } )
            .populate( 'caballo', 'nombre' );

        if ( odontologia.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay registro de odontología que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            odontologia
        } );
        
    } catch ( error ) {

        console.error( 'No hay registro de odontología que mostrar.', error );

        return res.json( {
            value: 0,
            msg: 'No hay registro de odontología que mostrar..'
        } );
    }
}

const registrarOdontologiaCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCaballo } = req.params;

    try {

        req.body.caballo = idCaballo;

        const odontologia = await Odontologia( req.body )
            .populate( 'caballo', 'nombre' );

        await odontologia.save();

        generarControl( nombre, apellidos, 'registrado un registro odontológico al caballo', odontologia.caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'Registro odontológico exitoso.'
        } );
        
    } catch ( error ) {

        console.error( 'Error en el registro odontológico.', error );

        return res.json( {
            value: 0,
            msg: 'Error en el registro odontológico.'
        } );
    }
}

const actualizarOdontologiaCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idOdontologia } = req.params;
    const { ...datos} = req.body;

    try {

        const odontologia = await Odontologia.findByIdAndUpdate( idOdontologia, datos )
            .populate( 'caballo', 'nombre' );

        generarControl( nombre, apellidos, 'actualizado un registro odontológico al caballo', odontologia.caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El registro odontológico se ha actualizado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el destete del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el destete del caballo.'
        } );
    }
}

const eliminarOdontologiaCaballo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idOdontologia } = req.params;

    try {

        const odontologia = await Odontologia.findByIdAndDelete( idOdontologia )
            .populate( 'caballo', 'nombre' );

        generarControl( nombre, apellidos, 'eliminado un registro odontológico al caballo', odontologia.caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El registro odontológico se ha eliminado.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar el registro odontológico del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el registro odontológico del caballo.'
        } );
    }
}

module.exports = {
    obtenerOdontologiaCaballos,
    obtenerOdontologiaCaballoById,
    registrarOdontologiaCaballo,
    actualizarOdontologiaCaballo,
    eliminarOdontologiaCaballo
}