require( 'dotenv' ).config(); // toma to-do el archivo .dotenv y establezca las variables de entorno
const Server = require( './models/server' );

const server = new Server();

server.listen();