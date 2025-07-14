import React, { useEffect, useMemo, useRef, useState } from "react";
import Logo from "../assets/hypermantis.svg";
import InputFile from "../components/InputFile.jsx";
import Button from "../components/Button.jsx";
import InputCheckBox from "../components/InputCheckBox.jsx";
import InputRadio from "../components/InputRadio.jsx";
import InputText from "../components/InputText.jsx";
import InputTextArea from "../components/InputTextArea.jsx";
import LogoText from "../components/LogoText.jsx";
import { useQuery, QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { sendFilesToProcessing } from "../queries/processing.js";
import useWebSocket from "react-use-websocket";
import ImageViewer from "../components/ImageViewer.jsx";
import Spinner from "../components/Spinner.jsx";
import LineChart from "../components/charts/LineChart.jsx";
import StepButtons from "../components/StepButtons.jsx";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
const Home = () => {
  const [files, setFiles] = useState([]);
  const serverStatusQuery = useQuery({
    queryFn: () => axios.get('http://localhost:8000/'),
    queryKey: ['server_status'],
    retry: true,
    retryDelay: 50,
  })

  const { data } = useQuery({
    queryFn: () => {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      return axios.post("http://localhost:8000/process", formData);
    },
    queryKey: ['process', ...files.map((file) => file.name)],
    enabled: files != false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })
  const imageQuery = useQuery({
    queryFn: () => axios.get('http://localhost:8000/as_image', { params: { transaction_name: data.data?.transaction_name } }),
    queryKey: ['image', data?.data?.transaction_name],
    enabled: data?.status === 200,
    refetchOnWindowFocus: false
  })
  const n = 25
  const image = imageQuery.data?.data?.data
  const [renderingImage, setRenderingImage] = useState(true)
  const [selectedPixel, setSelectedPixel] = useState(null)
  const selectedPixelQuery = useQuery({
    queryFn: () => axios.get('http://localhost:8000/get_pixel_info', { params: { transaction_name: data.data?.transaction_name, x: parseInt(selectedPixel.x), y: parseInt(selectedPixel.y) } }),
    queryKey: ['selected_pixel', data?.data?.transaction_name, selectedPixel?.x, selectedPixel?.y],
    enabled: selectedPixel !== null,
    placeholderData: (lastData) => lastData,
  })
  console.log('selectedPi ', selectedPixelQuery)
  let selectedPixelSeries = useMemo(() => {
    if (selectedPixelQuery.data?.data) {
      return [
        {
          label: 'Wavelength refraction index',
          data: Object.entries(selectedPixelQuery.data.data.pixel).map(([key, value]) => ({ wavelength: parseFloat(key), refractionIndex: value }))
        },
      ]
    }

    return null
  }, [selectedPixelQuery.isRefetching, selectedPixelQuery.isFetching])
  const [currentPrediction, setCurrentPrediction] = useState(null);
  const [selectedModel, setSelectedModel] = useState(1);
  useEffect(() => {
    setCurrentPrediction(null);
    setSelectedModel(1);
  }
    , [files]);
  const [mtd1, setMtd1] = useState(0);
  const [mtd2, setMtd2] = useState(0);
  const [mtd3, setMtd3] = useState(0);
  const getPrediction = useMutation({
    mutationFn: (model) => {
      return axios.get('http://localhost:8000/predict', { params: { transaction_name: data.data?.transaction_name, model: selectedModel, mtd1: mtd1, mtd2: mtd2, mtd3: mtd3 } })
    },
    onSuccess: (data => {
      console.log('Prediction data', data.data)
      setCurrentPrediction(data.data.data)
    }),
    onError: (error) => {
      console.error('Error fetching prediction:  ', error);
    }
  })
  const getWavelength = item => item.wavelength
  const getRefractionIndex = item => item.refractionIndex

  console.log('current sv status', serverStatusQuery)
  console.log('selectedmodel', selectedModel)
  if (!serverStatusQuery.isFetched) return (
    <div className="w-full h-full flex justify-center items-center flex-col bg-gray-50  dark:bg-slate-900 rounded border border-slate-100">
      <Spinner className="w-16 h-16" />
      <h2 className="text-xl font-light text-green-800 dark:text-green-300">Loading python server.</h2>
      <p className="text-md font-extralight text-slate-900 dark:text-slate-100">This could take a few minutes...</p>

    </div>
  )

  return (
    <div cm-template="default" className=" text-slate-900 dark:text-slate-100 w-screen h-screen flex flex-col justify-stretch items-center space-y-4">

      <LogoText />
      <div className="w-full h-full max-h-fit  flex flex-row">
        <div className="w-full h-full  max-h-fit flex flex-col overflow-y-auto py-10">
          <div className="flex flex-row sm:flex-row h-56  w-full items-center sm:justify-center p-4 shrink-0 ">
            <div className="h-full space-y-1 font-poppins w-1/2 px-4 flex flex-col">
              <p className="font-light text-center w-full ">Select a .bip and a .hdr file to view hyperspectral information</p>
              <InputFile max={2} onChangeFile={(newFiles) => setFiles(newFiles)} accept='.bip,.hdr,.bil' />
            </div>
            {
              (selectedPixel && selectedPixelSeries) && (
                (
                  <LineChart series={selectedPixelSeries} getValueForPrimaryAxis={getWavelength} getValueForSecondaryAxis={getRefractionIndex} />
                )
              )
            }
          </div>
          <div className="flex flex-col justify-center items-center bg-white rounded-md drop-shadow-md dark:bg-slate-950 p-2">
            {
              data && (
                (imageQuery.isLoading) ? <Spinner className="w-16 h-16" /> : (
                  <ImageViewer data={data} image={image} onRenderingStateChange={val => setRenderingImage(val)} onChangeSelectedPixel={newVal => setSelectedPixel(newVal)} />
                )
              )
            }
          </div>
        </div>
        {
          (data && !imageQuery.isLoading) && (
            <div className="w-3xl min-w-fit h-full flex rounded-md flex-col border-l border-slate-100 dark:border-slate-800  p-2">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">CNN hab detection models</h2>
              <div className="flex flex-col w-full items-center space-y-4">
                <div className="flex flex-row items-center space-x-4">
                  <InputRadio
                    id={'model'}
                    name={'model'}
                    value={selectedModel}
                    onChange={(value) => setSelectedModel(value)}
                    getId={(option) => option}
                    getName={(option) => {
                      if (option === 1) return 'Simple one-label';
                      if (option === 2) return 'Simple multi-label';
                      if (option === 3) return 'Extradata one-label';
                    }}

                    options={[1, 2, 3]}
                  ></InputRadio>

                </div>
                {
                  selectedModel === 3 && (
                    <div className="flex flex-col space-y-2 mt-4">
                      <InputText placeholder="9" value={mtd1} onChange={(e) => setMtd1(e.target.value)}>Temp° </InputText>
                      <InputText placeholder="0" value={mtd2} onChange={(e) => setMtd2(e.target.value)}>Salinidad</InputText>
                      <InputText placeholder="0" value={mtd3} onChange={(e) => setMtd3(e.target.value)}>Clo-a </InputText>
                    </div>
                  )
                }
                <Button style="primary"
                  className={'w-full'}
                  onClick={() => getPrediction.mutate(selectedModel)}
                >Predict HAB</Button>
                {
                  currentPrediction && (
                    <div className="flex flex-col items-center bg-slate-200 border border-green-100 shadow  rounded-md p-4 mt-4">
                      {
                        getPrediction.isPending ? (
                          <div className="flex flex-col items-center space-y-2">
                            <Spinner className="w-16 h-16" />
                            <p className="text-sm font-light text-green-800">Processing...</p>
                          </div>
                        ) : (
                          <>

                            <h3 className="text-lg font-semibold text-green-800">Prediction Result</h3>
                            <p className="text-sm text-slate-900">{currentPrediction.model_msg}</p>
                            <Pie

                              data={
                                {
                                  labels: currentPrediction.classes,
                                  datasets: [
                                    {
                                      label: 'Probability',
                                      data: currentPrediction.probabilities,
                                      backgroundColor: [
                                        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF',
                                        '#33FFF5', '#F5FF33', '#FF8C33', '#8CFF33', '#338CFF',
                                        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF',
                                        '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366'
                                      ],
                                      borderWidth: 1,

                                    },
                                  ],
                                }
                              }
                            />
                          </>
                        )
                      }
                    </div>
                  )
                }

              </div>

            </div>
          )
        }
      </div >



    </div >
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