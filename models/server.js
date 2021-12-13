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
            caballos: '/caballos',
            control: '/control',
            dietas: '/dietas',
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
        this.app.use( this.paths.caballos, require( '../routes/caballos.routes' ) );
        this.app.use( this.paths.control, require( '../routes/control.routes' ) );
        this.app.use( this.paths.tratamientos, require( '../routes/tratamientos.routes' ) );
        this.app.use( this.paths.usuarios, require( '../routes/usuarios.routes' ) );

        // Dietas
        this.app.use( this.paths.dietas, require( '../routes/dietas.routes' ) );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto:', this.port );
        } );
    }
}

module.exports = Server;