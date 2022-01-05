const router = require( 'express' ).Router();

const { obtenerReportes, obtenerReportesFecha }  = require( '../controllers/control.controller' );

router.get( '/', obtenerReportes );

router.get( '/:desde', obtenerReportesFecha );

module.exports = router;