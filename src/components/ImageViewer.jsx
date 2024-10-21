import React, { useCallback, useEffect, useRef, useState } from 'react'
import StepButtons from './StepButtons.jsx';

const ImageViewer = ({ image, data, onRenderingStateChange = () => { }, onChangeSelectedPixel = () => { } }) => {
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
        imageDataCtx.data[i * 4] = parseInt(imageData.data[i * 3] * 255);     // R
        imageDataCtx.data[i * 4 + 1] = parseInt(imageData.data[i * 3 + 1] * 255); // G
        imageDataCtx.data[i * 4 + 2] = parseInt(imageData.data[i * 3 + 2] * 255); // B
        imageDataCtx.data[i * 4 + 3] = 255; // Alpha, opacidad completa
      }
      // Dibuja la imagen en el canvas
      ctx.putImageData(imageDataCtx, 0, 0);
      onRenderingStateChange(false)
    }
  }, [data?.status, image]);
  const [scale, setScale] = useState(1)
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
  const onChangeSelectedPixelCallback = useCallback(onChangeSelectedPixel, [onChangeSelectedPixel])
  useEffect(() => {
    onChangeSelectedPixelCallback(selectedPixel)
  }, [selectedPixel])
  return (
    <>
      <div>
        <canvas ref={canvasRef} onClick={handleCanvasClick} />
      </div>
      <div className='w-fit flex flex-row justify-center items-center space-x-1 mt-1 '>
        <StepButtons onMinus={() => { }}>Scale: </StepButtons>
      </div>

    </>
  )
}

export default ImageViewer