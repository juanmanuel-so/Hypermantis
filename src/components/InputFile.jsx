import React from 'react'
import { FolderOpenIcon } from '@heroicons/react/20/solid'
const InputFile = () => {
  const [files, setFiles] = React.useState([]);
  console.log(files)
  return (

    <div className="max-w-xl text-slate-700">
      <label
        onDragOver={(e) => {
          e.preventDefault();

        }}
        onDrop={(e) => {
          e.preventDefault();
          console.log('listillo')

          const files = e.dataTransfer.files;
          setFiles(files);

        }}
        className="group flex justify-center  items-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-green-600 focus:outline-none space-x-2"
      >
        <FolderOpenIcon className='w-10 h-10 text-slate-600 group-hover:text-green-600' />
        <span className="font-normal">
          Drop files to Attach, or
          <span className="text-green-600 underline">{' '} browse</span>
        </span>
        <input
          onChange={e => {
            const files = e.target.files;
            setFiles(files);
          }}
          max={1}
          accept=".bil,.hdr"
          type="file"
          name="file_upload"
          className="hidden"
        />
      </label>
    </div>


  )
}

export default InputFile