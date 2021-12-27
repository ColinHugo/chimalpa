const { Conejo, DietaConejo } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerDietaConejos = async ( req, res ) => {

    try {

        const dietas = await DietaConejo.find()
            .populate( 'conejo', 'numeroConejo' )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        if ( dietas.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay dietas que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            dietas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las dietas de los conejos.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener las dietas de los conejos.'
        } );
    }
}

const obtenerDietaConejoById = async ( req, res ) => {

    const { idConejo } = req.params;

    try {

        const dieta = await DietaConejo.where( { conejo: idConejo } )
            .populate( 'conejo', 'numeroConejo' )
            .populate( 'usuario', [ 'nombre', 'apellidos'] );

        if ( dieta.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay dieta para el conejo.'
            } );
        }

        return res.json( {
            value: 1,
            dieta
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las dieta del conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al obtener la dieta del conejo.'
        } );
    }
}

const registrarDietaConejo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idConejo } = req.params;

    try {

        const conejo = await Conejo.findById( idConejo );
        
        req.body.conejo = conejo;

        const dieta = new DietaConejo( req.body );

        await dieta.save()

        generarControl( nombre, apellidos, 'registrado una dieta al conejo número', conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'La dieta se ha registrado.',
            dieta
        } );
        
    } catch ( error ) {

        console.error( 'Error al guardar la dieta del conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al guardar la dieta del conejo.'
        } );
    }
}

const actualizarDietaConejo = async ( req, res ) => {

    const { nombre, apellidos } = req.body.usuario;
    const { idDietaConejo } = req.params;
    const { ...datos } = req.body;

    try {

        const dietaConejo = await DietaConejo.findByIdAndUpdate( idDietaConejo, datos, { new: true } )
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        const conejo = await Conejo.findById( dietaConejo.conejo );

        generarControl( nombre, apellidos, 'actualizado una dieta al conejo número', conejo.numeroConejo );

        return res.json( {
            value: 1,
            msg: 'La dieta del conejo se ha actualizado.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la dieta del conejo.', error );

        return res.json( {
            value: 0,
            msg: 'Error al actualizar la dieta del conejo.'
        } );
    }
}

module.exports = {
    obtenerDietaConejos,
    obtenerDietaConejoById,
    registrarDietaConejo,
    actualizarDietaConejo
}