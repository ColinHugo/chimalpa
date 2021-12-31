const express = require( 'express' );
const cors = require( 'cors' );
const mongoSanitize = require( 'express-mongo-sanitize' );

const { dbConnection } = require( '../database/config' );

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/auth',
            aves: '/aves',
            borregos: '/borregos',
            caballos: '/caballos',
            conejos: '/conejos',
            control: '/control',
            cuarentenas: '/cuarentenas',
            dietas: '/dietas',
            destetes: '/destetes',
            historiaClinica: '/historia-clinica',
            historialReproductivo: '/historial-reproductivo',
            mascotas: '/mascotas',
            medicinas: '/medicinas',
            odontologia: '/odontologia',
            pruebasLaboratorio: '/pruebas-laboratorio',
            recortesCascos: '/recortes-cascos',
            recortesPesunas: '/recortes-pesunas',
            trasquilacion: '/trasquilacion',
            tratamientos: '/tratamientos',
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
        this.app.use( express.json() );
        this.app.use( mongoSanitize() );
    }

    routes(){
        this.app.use( this.paths.auth, require( '../routes/auth.routes' ) );
        this.app.use( this.paths.aves, require( '../routes/aves.routes' ) );
        this.app.use( this.paths.borregos, require( '../routes/borregos.routes' ) );
        this.app.use( this.paths.caballos, require( '../routes/caballos.routes' ) );
        this.app.use( this.paths.conejos, require( '../routes/conejos.routes' ) );
        this.app.use( this.paths.control, require( '../routes/control.routes' ) );
        this.app.use( this.paths.mascotas, require( '../routes/mascotas.routes' ) );
        this.app.use( this.paths.tratamientos, require( '../routes/tratamientos.routes' ) );
        this.app.use( this.paths.usuarios, require( '../routes/usuarios.routes' ) );

        // Cuarentenas
        this.app.use( this.paths.cuarentenas, require( '../routes/cuarentenas.routes' ) );

        // Dietas de todos los animales
        this.app.use( this.paths.dietas, require( '../routes/dietas.routes' ) );

        // Destetes de todos los animales
        this.app.use( this.paths.destetes, require( '../routes/destetes.routes' ) );

        // Medicinas
        this.app.use( this.paths.medicinas, require( '../routes/medicinas.routes' ) );

        // Recortes cascos y pesuñas
        this.app.use( this.paths.recortesCascos, require( '../routes/recortes-cascos.routes' ) );
        this.app.use( this.paths.recortesPesunas, require( '../routes/recortes-pesunas-borregos.routes' ) );

        // Odontologia
        this.app.use( this.paths.odontologia, require( '../routes/odontologia.routes' ) );

        // Historia Clinica
        this.app.use( this.paths.historiaClinica, require( '../routes/historia-clinica.routes' ) );

        // Historial Reproductivo
        this.app.use( this.paths.historialReproductivo, require( '../routes/historial-reproductivo.routes' ) );

        // Pruebas Laboratorio
        this.app.use( this.paths.pruebasLaboratorio, require( '../routes/prueba-laboratorio.routes' ) );

        // Trasquilacion
        this.app.use( this.paths.trasquilacion, require( '../routes/trasquilacion.routes' ) );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto:', this.port );
        } );
    }
}

module.exports = Server;