const { Control } = require( '../models' );

const generarControl = async ( nombre, apellidos, accion, nombreAnimal ) => {

    const mensaje = `${ nombre } ${ apellidos } ha ${ accion } a ${ nombreAnimal }.`;

    try {

        const reporte = new Control( { mensaje } );
        await reporte.save();
        
    } catch ( error ) {

        console.error( 'Error al generar el reporte', error );

        return res.json( {
            value: 0,
            msg: 'Error al generar el reporte.'
        } );
    }
}

module.exports = {
    generarControl
}