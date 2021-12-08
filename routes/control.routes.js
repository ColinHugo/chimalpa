const router = require( 'express' ).Router();

const { obtenerReportes }  = require( '../controllers/control.controller' );

router.get( '/', obtenerReportes )

module.exports = router;