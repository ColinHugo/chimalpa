const { Ave, CuarentenaAve } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerCuarentenaAves = async ( req, res ) => {

    try {

        const cuarentenas = await CuarentenaAve.find()
            .populate( 'ave', 'numeroAve' )
            .populate( 'usuario', [ 'nombre', 'apellidos'] );

        if ( cuarentenas.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay cuarentenas que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            cuarentenas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las cuarentenas de las aves.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las dietas de las cuarentenas.'
        } );
    }
}

const obtenerCuarentenaAveById = async ( req, res ) => {

    const { idAve } = req.params;

    try {

        const cuarentena = await CuarentenaAve.where( { ave: idAve } )
            .populate( 'ave', 'numeroAve' )
            .populate( 'usuario', [ 'nombre', 'apellidos'] );

        if ( cuarentena.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay cuarentena para el ave.'
            } )
        }

        return res.json( {
            value: 1,
            cuarentena
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la cuarentena del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la cuarentena del ave.'
        } );
    }
}

const registrarCuarentenaAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idAve } = req.params;

    try {

        const ave = await Ave.findById( idAve );
        
        req.body.ave = ave;

        const cuarentena = new CuarentenaAve( req.body );

        await cuarentena.save()

        generarControl( nombre, apellidos, 'registrado una cuarentena al ave número', ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'La cuarentena se ha registrado.',
            cuarentena
        } );
        
    } catch ( error ) {

        console.error( 'Error al guardar la cuarentena del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al guardar la cuarentena del ave.'
        } );
    }
}

const actualizarCuarentenaAve = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idCuarentena } = req.params;
    const { ...datos } = req.body;

    try {

        const cuarentenaAve = await CuarentenaAve.findByIdAndUpdate( idCuarentena, datos, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        const ave = await Ave.findById( cuarentenaAve.ave );

        generarControl( nombre, apellidos, 'actualizado una cuarentena al ave número', ave.numeroAve );

        return res.json( {
            value: 1,
            msg: 'La cuarentena del ave se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la cuarentena del ave.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la cuarentena del ave.'
        } );
    }
}

module.exports = {
    obtenerCuarentenaAves,
    obtenerCuarentenaAveById,
    registrarCuarentenaAve,
    actualizarCuarentenaAve
}