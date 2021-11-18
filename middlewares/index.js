const validaCampos  = require( '../middlewares/validar-campos' );
const validaJWT  = require( '../middlewares/validar-jwt' );

module.exports = {
    ...validaCampos,
    ...validaJWT
}