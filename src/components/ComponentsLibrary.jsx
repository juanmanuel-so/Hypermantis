const ComponentsLibrary = () => {
  return (
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
      <StepButtons />
    </div>
  )
}
export default ComponentsLibrary