const fs = require( 'fs' );
const path = require( 'path' );
require( 'dotenv' ).config();

const Server = require( './models/server' );

const server = new Server();

if ( !fs.existsSync( path.join( __dirname, 'uploads' ) ) ) {
    fs.mkdirSync( 'uploads' );
}

server.listen();