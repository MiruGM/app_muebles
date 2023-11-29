"use strict";

const rutaBackend = "http://localhost/app_muebles/backend/";

/**
 * Realiza peticiones AJAX de tipo GET
 * @param {string} url 
 * @param {FormData} parametros - Objeto FormData con los parámetros de la llamada 
 * @returns response
 */

// async function peticionGet (url, parametros)
async function peticionGET (url, parametros) {
    // Creamos el objeto URL que contiene la dirección url de la petición
    // y los datos que enviamos con la petición
    let oURL = new URL(rutaBackend);
    oURL.pathname += url; // por ejemplo "altaTipo.php"

    // Agregamos los datos de los parámetros que vienen en un objeto FormData 
    for (let [clave, valor] of parametros) {
        oURL.searchParams.append(clave, valor);
    }

    // Finalmente hacemos la petición AJAX con el método fetch
    let respuestaServidor = await fetch(oURL, { method: "GET" });
    let response; // Datos devueltos por el servidor o datos de error

    if (respuestaServidor.ok) {  // Si es una respuesta OK
        // JSON.parse de los datos recibidos
        response = await respuestaServidor.json(); 

    } else { // Si no es una respuesta OK
        console.error("Error al acceder al acceder al servidor. Error: " + respuestaServidor.status);
       
        response = { 
            error: true, 
            mensaje: "Error al acceder al acceder al servidor. Error: " + respuestaServidor.status, 
            datos: null 
        };

    }
    
    return response;
}

/**
 * Realiza peticiones AJAX de tipo POST
 * @param {string} url 
 * @param {FormData} parametros - Objeto FormData con los parámetros de la llamada 
 * @returns 
 */
async function peticionPOST(url, parametros) {
    // Creamos el objeto URL que contiene la dirección url de la petición
    // y los datos que enviamos con la petición
    let oURL = new URL(rutaBackend);
    oURL.pathname += url; // por ejemplo "altaTipo.php"

    let respuestaServidor = await fetch(oURL, {
        body: parametros,  // objeto FormData
        method: "POST"
    });

    let response;

    if (respuestaServidor.ok) {  // Si es una respuesta OK
        // JSON.parse de los datos recibidos
        response = await respuestaServidor.json(); 

    } else { // Si no es una respuesta OK
        console.error("Error al acceder al acceder al servidor. Error: " + respuestaServidor.status);
       
        response = { 
            error: true, 
            mensaje: "Error al acceder al acceder al servidor. Error: " + respuestaServidor.status, 
            datos: null 
        };

    }
    
    return response;
}
