import React, { useEffect, useMemo, useRef, useState } from "react";
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
import ImageViewer from "../components/ImageViewer.jsx";
import Spinner from "../components/Spinner.jsx";
import LineChart from "../components/charts/LineChart.jsx";
const Home = () => {
  const [files, setFiles] = useState([]);
  const { data } = useQuery({
    queryFn: () => {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      return axios.post("http://localhost:8000/process", formData);
    },
    queryKey: ['process', ...files.map((file) => file.name)],
    enabled: files != false,
    refetchOnWindowFocus:false
  })
  const imageQuery = useQuery({
    queryFn: () => axios.get('http://localhost:8000/as_image', { params: { transaction_name: data.data?.transaction_name } }),
    queryKey: ['image', data?.data?.transaction_name],
    enabled: data?.status === 200,
    refetchOnWindowFocus:false
  })
  const n = 25
  const image = imageQuery.data?.data?.data
  const [renderingImage, setRenderingImage] = useState(true)
  const [selectedPixel, setSelectedPixel] = useState(null)
  const selectedPixelQuery = useQuery({
    queryFn: () => axios.get('http://localhost:8000/get_pixel_info', { params: { transaction_name: data.data?.transaction_name, x: parseInt(selectedPixel.x), y: parseInt(selectedPixel.y) } }),
    queryKey: ['selected_pixel', data?.data?.transaction_name, selectedPixel?.x, selectedPixel?.y],
    enabled: selectedPixel !== null,
  })
  let selectedPixelSeries = useMemo(()=>{
    if(selectedPixelQuery.data?.data){
      return [
        {
          label: 'Wavelength refraction index',
          data: Object.entries(selectedPixelQuery.data.data.pixel).map(([key, value]) => ({wavelength: parseFloat(key), refractionIndex: parseFloat(value)}))
        }
      ]
    }

    return null
  },[selectedPixelQuery.isRefetching, selectedPixelQuery.isFetching])

  const getWavelength = item => item.wavelength
  const getRefractionIndex = item => item.refractionIndex
  console.log('series', selectedPixelSeries)
  console.log('selectedPixel', selectedPixel)
  return (
    <div cm-template="default" className=" text-slate-900 dark:text-slate-100 w-full h-full overflow-y-auto flex flex-col justify-stretch items-center space-y-4">

      <LogoText />
      <div className="flex flex-col sm:flex-row h-56  w-full items-center sm:justify-center p-4 shrink-0 ">
        <div className="h-full space-y-1 font-poppins w-1/2 px-4 flex flex-col">
          <p className="font-light text-center w-full ">Select a .bip and a .hdr file to view hyperspectral information</p>
          <InputFile max={2} onChangeFile={(newFiles) => setFiles(newFiles)} accept='.bip,.hdr,.bil' />
        </div>
        {
          (selectedPixel) && (
            selectedPixelQuery.isLoading ? <div className="w-1/2 h-full flex items-center justify-center bg-white dark:bg-slate-950 rounded-md opacity-30"><Spinner className="w-16 h-16" /></div> : (
              <LineChart series={selectedPixelSeries} getValueForPrimaryAxis={getWavelength} getValueForSecondaryAxis={getRefractionIndex}/>
            )
          )
        }
      </div>
      <div className="flex flex-col justify-center items-center bg-white rounded-md drop-shadow-md dark:bg-slate-950 p-2">
        {
          data&&(
            (imageQuery.isLoading) ? <Spinner className="w-16 h-16" /> : (
              <ImageViewer data={data} image={image} onRenderingStateChange={val => setRenderingImage(val)} onChangeSelectedPixel={newVal => setSelectedPixel(newVal)} />
            )
          )
        }
      </div>
      {/*
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
        <Spinner />
      </div>
      */}
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