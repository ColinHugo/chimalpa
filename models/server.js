const express = require( 'express' );
const cors = require( 'cors' );
const mongoSanitize = require( 'express-mongo-sanitize' );

const { dbConnection } = require( '../database/config' );

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            alertas: '/alertas',
            auth: '/auth',
            aves: '/aves',
            borregos: '/borregos',
            caballos: '/caballos',
            capacitaciones: '/capacitaciones',
            conejos: '/conejos',
            control: '/control',
            cuarentenas: '/cuarentenas',
            dietas: '/dietas',
            destetes: '/destetes',
            herramientas: '/herramientas',
            historiaClinica: '/historia-clinica',
            historialReproductivo: '/historial-reproductivo',
            mascotas: '/mascotas',
            medicinas: '/medicinas',
            odontologia: '/odontologia',
            montas: '/programar-montas',
            pruebasLaboratorio: '/pruebas-laboratorio',
            recortesCascos: '/recortes-cascos',
            recortesPesunas: '/recortes-pesunas',
            rondin: '/rondin',
            tareas: '/tareas',
            trasquilacion: '/trasquilacion',
            tratamientosEventuales: '/tratamientos-eventuales',
            tratamientosPermanentes: '/tratamientos-permanentes',
            ultrasonidos: '/ultrasonidos',
            usuarios: '/usuarios',
        }

        this.conectarDB();
        
        this.middlewares();

        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use( cors() );
        this.app.use( express.json( { limit: '100mb' } ) );
        this.app.use( mongoSanitize() );
        this.app.use( express.static( __dirname + '/../uploads' ) );
        this.app.use( express.static( __dirname + '/../assets' ) );
    }

    routes(){
        this.app.use( this.paths.alertas, require( '../routes/alertas.routes' ) );
        this.app.use( this.paths.auth, require( '../routes/auth.routes' ) );
        this.app.use( this.paths.aves, require( '../routes/aves.routes' ) );
        this.app.use( this.paths.borregos, require( '../routes/borregos.routes' ) );
        this.app.use( this.paths.caballos, require( '../routes/caballos.routes' ) );
        this.app.use( this.paths.capacitaciones, require( '../routes/capacitacion.routes' ) );
        this.app.use( this.paths.conejos, require( '../routes/conejos.routes' ) );
        this.app.use( this.paths.control, require( '../routes/control.routes' ) );
        this.app.use( this.paths.cuarentenas, require( '../routes/cuarentenas.routes' ) );
        this.app.use( this.paths.destetes, require( '../routes/destetes.routes' ) );
        this.app.use( this.paths.dietas, require( '../routes/dietas.routes' ) );
        this.app.use( this.paths.herramientas, require( '../routes/herramientas.routes' ) );
        this.app.use( this.paths.historiaClinica, require( '../routes/historia-clinica.routes' ) );
        this.app.use( this.paths.historialReproductivo, require( '../routes/historial-reproductivo.routes' ) );
        this.app.use( this.paths.mascotas, require( '../routes/mascotas.routes' ) );
        this.app.use( this.paths.medicinas, require( '../routes/medicinas.routes' ) );
        this.app.use( this.paths.odontologia, require( '../routes/odontologia.routes' ) );
        this.app.use( this.paths.montas, require( '../routes/montas.routes' ) );
        this.app.use( this.paths.pruebasLaboratorio, require( '../routes/prueba-laboratorio.routes' ) );
        this.app.use( this.paths.recortesCascos, require( '../routes/recortes-cascos.routes' ) );
        this.app.use( this.paths.recortesPesunas, require( '../routes/recortes-pesunas-borregos.routes' ) );
        this.app.use( this.paths.rondin, require( '../routes/rondin-caballo.routes' ) );
        this.app.use( this.paths.tareas, require( '../routes/tareas.routes' ) );
        this.app.use( this.paths.trasquilacion, require( '../routes/trasquilacion.routes' ) );
        this.app.use( this.paths.tratamientosEventuales, require( '../routes/tratamientos-eventuales.routes' ) );
        this.app.use( this.paths.tratamientosPermanentes, require( '../routes/tratamientos-permanentes.routes' ) );
        this.app.use( this.paths.usuarios, require( '../routes/usuarios.routes' ) );
        this.app.use( this.paths.ultrasonidos, require( '../routes/ultrasonidos-caballos.routes' ) );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto:', this.port );
        } );
    }
}

module.exports = Server;