import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/hypermantis.svg";
import InputFile from "../components/InputFile.jsx";
import Button from "../components/Button.jsx";
import InputCheckBox from "../components/InputCheckBox.jsx";
import InputRadio from "../components/InputRadio.jsx";
import InputText from "../components/InputText.jsx";
import InputTextArea from "../components/InputTextArea.jsx";
import LogoText from "../components/LogoText.jsx";
import { useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { sendFilesToProcessing } from "../queries/processing.js";
import useWebSocket from "react-use-websocket";
const Home = () => {
  const queryClient = new QueryClient();

  const [files, setFiles] = React.useState();
  const { data } = useQuery({
    queryFn: () => {
      // Crear el FormData
      const formData = new FormData();

      // Si tienes múltiples archivos
      if (files) {
        files.forEach((file) => {
          formData.append('files', file);  // Debe ser 'files' en plural si FastAPI lo espera así
        });
      }

      // Hacer la solicitud POST con axios
      return axios.post("http://localhost:8000/process", formData);
    },
    queryKey: ['process', files],
    enabled: files !== undefined,

  }, queryClient)
  const imageQuery = useQuery({
    queryFn: () => axios.get('http://localhost:8000/as_image', { params: { transaction_name: data.data?.transaction_name } }),
    queryKey: ['image', data?.data?.transaction_name],
    enabled: data?.status === 200
  }, queryClient)
  console.log('iquery', imageQuery)
  const n = 25
  const image = imageQuery.data?.data?.data
  const canvasRef = useRef(null);
  const [selectedPixel, setSelectedPixel] = useState(null);

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const imageData = { width: image.length, height: image[0].length, data: image.flat().flat() }
      const width = imageData.height;
      const height = imageData.width;

      // Ajusta el tamaño del canvas
      canvas.width = width;
      canvas.height = height;

      // Creamos un ImageData desde los datos RGB
      const imageDataCtx = ctx.createImageData(width, height);

      for (let i = 0; i < width * height; i++) {
        console.log('imgd', imageData.data[i * 3])
        imageDataCtx.data[i * 4] = parseInt(imageData.data[i * 3] * 255);     // R
        imageDataCtx.data[i * 4 + 1] = parseInt(imageData.data[i * 3 + 1] * 255); // G
        imageDataCtx.data[i * 4 + 2] = parseInt(imageData.data[i * 3 + 2] * 255); // B
        imageDataCtx.data[i * 4 + 3] = 255; // Alpha, opacidad completa
      }
      // Dibuja la imagen en el canvas
      ctx.putImageData(imageDataCtx, 0, 0);
    }
  }, [data?.status, image]);

  // Maneja el clic en el canvas
  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Opcional: Obtén el color del pixel clickeado
    const ctx = canvas.getContext('2d');
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    setSelectedPixel({ x, y, color: `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})` });
  };
  console.log('selectedPixel', selectedPixel)
  return (
    <div cm-template="default" className=" text-slate-900 dark:text-slate-100 w-full h-full overflow-y-auto flex flex-col justify-stretch items-center space-y-4">

      <LogoText />
      <div className="flex flex-col sm:flex-row h-fit w-full p-4">
        <div className="h-fit space-y-1 font-poppins w-1/2 px-4">
          <p className="font-light text-center w-full ">Select a .bip and a .hdr file to view hyperspectral information</p>
          <InputFile max={2} onChangeFile={(newFiles) => setFiles(newFiles)} />
        </div>
        <div className="h-fit space-y-1 font-poppins w-1/2 overflow-scroll">

        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <canvas ref={canvasRef} onClick={handleCanvasClick} style={{ border: '1px solid black' }} />
        {selectedPixel && (
          <div>
            <p>Pixel seleccionado: ({selectedPixel.x}, {selectedPixel.y})</p>
            <p>Color: {selectedPixel.color}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col w-fit h-fit space-y-1 font-poppins">
        <h2 className="font-light ">Components library</h2>
        <InputFile />
        <Button style="primary">primary</Button>
        <Button style="secondary">secondary</Button>
        <Button style="danger">danger</Button>
        <InputCheckBox>Check me</InputCheckBox>
        <InputRadio>Radio me</InputRadio>
        <InputText>Text me</InputText>
        <InputTextArea>Textarea me</InputTextArea>
      </div>
    </div>
  )
}
export default Home

/*
 const socketUrl = 'ws://localhost:8000/ws';
 const [rows, setRows] = useState([[]])
 const {
   sendMessage,
   sendJsonMessage,
   lastMessage,
   lastJsonMessage,
   readyState,
   getWebSocket,

 } = useWebSocket(socketUrl, {
   onOpen: () => console.log('opened'),
   //Will attempt to reconnect on all close events, such as server shutting down
   shouldReconnect: (closeEvent) => false,
 });
 const lastJsonMessageString = JSON.stringify(lastJsonMessage, null, 2);
 useEffect(
   ()=>{
     if(lastJsonMessage && lastJsonMessage.type === 'image-part'){
       rows[lastJsonMessage.row][lastJsonMessage.col]=lastJsonMessage.data
       setRows([...rows, []])
     }
   }
 ,[lastJsonMessageString, lastJsonMessage  ])
 useEffect(
   ()=>{
     if(data?.status === 200){
       console.log('sending data', data)
       sendJsonMessage({type:'start', transaction_name: data.data?.transaction_name})
     }
   }
 ,[data?.status])
*/