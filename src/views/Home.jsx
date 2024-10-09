import React from "react";
import Logo from "../assets/hypermantis.svg";
import InputFile from "../components/InputFile.jsx";
import Button from "../components/Button.jsx";
import InputCheckBox from "../components/InputCheckBox.jsx";
import InputRadio from "../components/InputRadio.jsx";
import InputText from "../components/InputText.jsx";
import InputTextArea from "../components/InputTextArea.jsx";
import LogoText from "../components/LogoText.jsx";
const Home = () => {
  return (
    <div className=" text-slate-900 dark:text-slate-100 w-full h-full overflow-y-auto flex flex-col justify-stretch items-center space-y-4">

      <LogoText/>
      <div className="flex flex-col w-fit h-fit space-y-1 font-poppins">
        <p className="font-light ">Select a .bil file to view hyperspectral information</p>
        <InputFile />
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