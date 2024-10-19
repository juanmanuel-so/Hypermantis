const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Función para enviar archivos a la API FastAPI
async function enviarArchivos() {
    const form = new FormData();

    // Adjuntar archivos
    form.append('files', fs.createReadStream('ruta/al/archivo_real.bip'));  // Archivo real
    form.append('files', fs.createReadStream('ruta/al/header.hdr'));        // Archivo de header

    // Enviar archivos a la API
    try {
        const response = await axios.post('http://localhost:8000/process_image/', form, {
            headers: form.getHeaders()
        });
        console.log(response.data);  // Procesar la respuesta
    } catch (error) {
        console.error('Error al enviar los archivos:', error);
    }
}
