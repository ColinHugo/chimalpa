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

const generarUrlFotosRondines = ( req, carpeta, documentos ) => {

    const { foto } = documentos[ 0 ].caballo;
    documentos[ 0 ].caballo.foto = `${ req.protocol }://${ req.headers.host }/caballos/${ foto }`;

    documentos.forEach( documento => {

        if ( documento.fotoAgua ) {
            documento.fotoAgua = `${ req.protocol }://${ req.headers.host }/${ carpeta }/${ documento.fotoAgua }`;
        } else {
            documento.fotoAgua = `${ req.protocol }://${ req.headers.host }/no-image.jpg`;
        }

        if ( documento.fotoComida ) {
            documento.fotoComida = `${ req.protocol }://${ req.headers.host }/${ carpeta }/${ documento.fotoComida }`;
        } else {
            documento.fotoComida = `${ req.protocol }://${ req.headers.host }/no-image.jpg`;
        }

        if ( documento.fotoHece ) {
            documento.fotoHece = `${ req.protocol }://${ req.headers.host }/${ carpeta }/${ documento.fotoHece }`;
        } else {
            documento.fotoHece = `${ req.protocol }://${ req.headers.host }/no-image.jpg`;
        }
    } );

    return documentos;
}

const generarUrlFotosUltrasonidos = ( req, carpeta, documentos ) => {

    documentos.forEach( documento => {

        if ( documento.fotoOvarioDerecho ) {
            documento.fotoOvarioDerecho = `${ req.protocol }://${ req.headers.host }/${ carpeta }/${ documento.fotoOvarioDerecho }`;
        } else {
            documento.fotoOvarioDerecho = `${ req.protocol }://${ req.headers.host }/no-image.jpg`;
        }

        if ( documento.fotoOvarioIzquierdo ) {
            documento.fotoOvarioIzquierdo = `${ req.protocol }://${ req.headers.host }/${ carpeta }/${ documento.fotoOvarioIzquierdo }`;
        } else {
            documento.fotoOvarioIzquierdo = `${ req.protocol }://${ req.headers.host }/no-image.jpg`;
        }

        if ( documento.fotoUltraSonido ) {
            documento.fotoUltraSonido = `${ req.protocol }://${ req.headers.host }/${ carpeta }/${ documento.fotoUltraSonido }`;
        } else {
            documento.fotoUltraSonido = `${ req.protocol }://${ req.headers.host }/no-image.jpg`;
        }
    } );

    return documentos;
}

module.exports = {
    generarUrlFotos,
    generarUrlFotosRondines,
    generarUrlFotosUltrasonidos
}