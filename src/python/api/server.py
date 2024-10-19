from fastapi import FastAPI, File, UploadFile, WebSocket
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import ORJSONResponse
from fastapi.responses import StreamingResponse
import spectral as spy
import numpy as np
import uuid
import orjson 
import json
from processing.decode import decode
import os
app = FastAPI()
temp_dir = "./temp/"
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todos los orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permitir todos los headers
)
app.add_middleware(GZipMiddleware, minimum_size=1000, compresslevel=5)

async def stream_image(data_location, header_location):
    image = decode(data_location, header_location)
    bands = image.bands
    shape = image.img.shape
    print('image img', shape[0])
    to_stream = {
        'bands': bands,
        'shape': shape,
        'img': image.img[:,:,:].tolist(),
        'metadata': image.metadata
    }
    yield orjson.dumps(to_stream)
  

@app.post("/process")
async def process_image(files: list[UploadFile] = File(...)):
    # Asegúrate de que tienes dos archivos: uno real y otro de header
    print('Start file processing')
    if len(files) != 2:
        return JSONResponse({'message': 'Two files are required: data and header'}, status_code=400)

    # Crear una carpeta temporal para guardar los archivos
    
    os.makedirs(temp_dir, exist_ok=True)

    # Procesar los dos archivos
    print('reading bip', files[0].filename)
    print('reading header', files[1].filename)
    transaction_name = str(uuid.uuid4())
    data_file_location = os.path.join(temp_dir, transaction_name+'.bip')  # Archivo real
    header_file_location = os.path.join(temp_dir, transaction_name+'.bip.hdr')  # Archivo header

    # Guardar los archivos localmente
    with open(data_file_location, "wb") as data_f:
        data_f.write(files[0].file.read())
    with open(header_file_location, "wb") as header_f:
        header_f.write(files[1].file.read())

    # Cargar la imagen usando spectral.open_image con el archivo de encabezado
    print('Image processed successfully')
    result = {
        'message': 'Image processed successfully',
        'transaction_name': transaction_name,
    }
    return result
# Iniciar el servidor con uvicorn
@app.get('/')
async def status():
    return JSONResponse({'message': 'Server is running'})


async def send_image_by_websocket(websocket, transaction_name):
    data_filename = os.path.join(temp_dir, transaction_name+'.bip')
    header_filename = os.path.join(temp_dir, transaction_name+'.bip.hdr')
    image = decode(data_filename, header_filename)
    shape = image.img.shape
    bands = image.bands
    for i in range(shape[0]):
        for j in range(shape[1]):
            print('sending', i, j)
            content = b'{"type": "image-part", "row": '+str(i).encode()+b',"col":'+str(j).encode()+b', "data": '+image.img[i,j].tostring().encode() +b'}'
            await websocket.send_bytes(content)
    await websocket.send_json({
        'type': 'image-end',
        'bands': bands,
    })
    
@app.get("/as_image")
async def get_as_image(transaction_name: str):
    data_filename = os.path.join(temp_dir, transaction_name+'.bip')
    header_filename = os.path.join(temp_dir, transaction_name+'.bip.hdr')
    image = decode(data_filename, header_filename)
    rgb_wavelengths = [400, 550, 610]

# Función para obtener el índice del número o el más cercano si no existe
    def find_closest(arr, val):
        dif = [abs(float(x) - val) for x in arr]
        # Obtener el índice del valor con la menor diferencia
        closest_index = dif.index(min(dif))
        return closest_index

    # Encontrar la posición de cada número o el más cercano

    positions = [find_closest(image.bands, num) for num in rgb_wavelengths]
    rgb_image = spy.get_rgb(image.img, positions.reverse())
    test = spy.open_image(header_filename)
    print('rgb position ', positions)
    spy.save_rgb('./test/rgb.png', test, positions.reverse())
    print('selected bands', image.bands[positions[0]], image.bands[positions[1]], image.bands[positions[2]])
    return {'message':'image created', 'data': rgb_image[:,:,:].tolist()}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_json()
        if data['type'] == 'start':
            await send_image_by_websocket(websocket, data['transaction_name'])
        if data['type'] == 'stop':
            break
        
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
