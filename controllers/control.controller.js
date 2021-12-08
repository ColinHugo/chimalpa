const { Control } = require( '../models' );

const obtenerReportes = async ( req, res ) => {

    try {

        const reporte = await Control.find();

        if ( reporte.length === 0 ) {

            return res.json( {
                value: 0,
                msg: 'No hay movimientos que mostrar.'
            } );
        }

        return res.json( {
            value: 1,
            reporte
        } );
        
    } catch ( error ) {

        console.error( 'Error al mostrar los movimientos realizados por los usuarios.', error )

        return res.json( {
            value: 0,
            msg: 'Error al mostrar los movimientos realizados por los usuarios.'
        } );
    }
}

module.exports = {
    obtenerReportes
}