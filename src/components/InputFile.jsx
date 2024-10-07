import React from 'react'
import { FolderOpenIcon } from '@heroicons/react/20/solid'
const InputFile = ({label='Select File or browse'}) => {
  const [files, setFiles] = React.useState([]);
  console.log(files)
  return (

    <div className="max-w-xl text-slate-700 ">
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
        className="group flex justify-center drop-shadow-lg items-center w-full h-32 px-4 transition bg-slate-50 dark:bg-slate-800 dark:text-slate-300  border-2 border-slate-300 dark:border-slate-900 border-dashed rounded-md appearance-none cursor-pointer hover:border-green-600 focus:outline-none space-x-2"
      >
        <FolderOpenIcon className='w-10 h-10 group-hover:text-green-600 drop-shadow-lg' />
        <span className="font-normal">
          {label}
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