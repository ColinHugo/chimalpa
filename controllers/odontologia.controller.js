const { Odontologia, Caballo } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

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
    const { tratamiento, descripcion, frecuencia } = req.body;

    try {

        const caballo = await Caballo.findById( idCaballo );

        const odontologia = await Odontologia( { tratamiento, descripcion, frecuencia, caballo } )
            .populate( 'caballo', 'nombre' );

        await odontologia.save();

        generarControl( nombre, apellidos, 'registrado una odontología', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'Registro odontológico exitoso.',
            odontologia
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

        const odontologia = await Odontologia.findByIdAndUpdate( idOdontologia, datos, { new: true } )
            .populate( 'caballo', 'nombre' );

        const caballo = await Caballo.findById( odontologia.caballo );

        generarControl( nombre, apellidos, 'actualizado un registro odontológico', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El registro odontológico se ha actualizado.',
            odontologia
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el destete del caballo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar el destete del caballo.'
        } );
    }
}

module.exports = {
    obtenerOdontologiaCaballos,
    obtenerOdontologiaCaballoById,
    registrarOdontologiaCaballo,
    actualizarOdontologiaCaballo
}