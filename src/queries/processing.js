import axios from "axios";

const sendFilesToProcessing = async (files) => {
  const formData = new FormData();

  formData.append('files', files[0]);  // Archivo real
  formData.append('files', files[1]);  // Archivo de encabezado
  var finalJson = null;
  try {
    // Enviar los archivos a la API FastAPI
    const response = await fetch('http://localhost:8000/process/', {
      method: 'POST',
      body: formData
    });
  
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }
  
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let jsonChunks = '';  // Aquí iremos uniendo las partes del JSON
  
    const processStream = async () => {
      let done = false;
      let initialData = null
      let rows=[]
      let sample=[]
      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
  
        // Decodificar los bytes recibidos en texto
        const chunk = decoder.decode(value, { stream: true });
        jsonChunks = jsonChunks.concat(chunk);
      }
  

  
      // Al final del stream, parsear el JSON completo
      console.log('final string',jsonChunks)
      finalJson = JSON.parse(jsonChunks);
    };
  
    await processStream();
  
    alert('Archivos subidos exitosamente');
  } catch (error) {
    console.error('Error al subir archivos:', error);
    alert('Hubo un error al subir los archivos');
  }
  
  
}
export { sendFilesToProcessing }