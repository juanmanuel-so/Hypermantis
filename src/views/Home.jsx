import React from "react";
import Logo from "../assets/hypermantis.svg";
import InputFile from "../components/InputFile.jsx";
const Home = () => {
  return (
    <div className="text-slate-900 w-full h-full flex flex-col justify-center items-center space-y-4">
      <div className="flex flex-row justify-start items-center space-x-4 p-2">
        <Logo className="w-10  h-10 " />
        <h1 className="w-fit font-normal text-3xl">Hypermantis</h1>
      </div>
      <div className="flex flex-col w-fit h-fit space-y-1 font-poppins">
        <h2 className="font-light ">Select a .bil file to view hyperspectral information</h2>
        <InputFile/>
      </div>
    </div>
  )
}
export default Home