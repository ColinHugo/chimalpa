const { Caballo, ProgramarMontaCaballo, UltrasonidoCaballo } = require( '../models' );

const { generarControl } = require( '../helpers/generar-control' );

const obtenerUltrasonidoCaballoById = async ( req, res ) => {

    const { idMonta } = req.params;

    try {

        const ultrasonido = await UltrasonidoCaballo.where( { monta: idMonta } );

        if ( ultrasonido.length === 0 ) {
            return res.json( {
                value: 0,
                msg: 'No hay ultrasonidos registrados.'
            } )
        }

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

    try {

        const monta = await ProgramarMontaCaballo.findById( idMonta );
        req.body.monta = monta;

        const ultrasonido = new UltrasonidoCaballo( req.body );

        const [ caballo ] = await Promise.all( [
            Caballo.findById( monta.caballo ),
            ultrasonido.save()
        ] );

        generarControl( nombre, apellidos, 'registrado un ultrasonido a la yegua', caballo.nombre );

        return res.json( {
            value: 1,
            msg: 'El ultrasonido se ha registrado.',
            ultrasonido
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
    registrarUltraSonidoCaballo
}