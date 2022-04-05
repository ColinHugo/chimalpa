const generarUrlFotos = ( req, carpeta, documentos ) => {

    if ( Array.isArray( documentos ) ) {

        documentos.forEach( documento => {

            if ( documento.foto ) {
                documento.foto = `${ req.protocol }://${ req.headers.host }/${ carpeta }/${ documento.foto }`;
            } 
            
            else {
                documento.foto = `${ req.protocol }://${ req.headers.host }/no-image.jpg`;
            }
        } );
    } 
    
    else {

        if ( documentos.foto ) {
            documentos.foto = `${ req.protocol }://${ req.headers.host }/${ carpeta }/${ documentos.foto }`;
        } else {
            documentos.foto = `${ req.protocol }://${ req.headers.host }/no-image.jpg`;
        }
    }

    return documentos;
}

module.exports = {
    generarUrlFotos
}