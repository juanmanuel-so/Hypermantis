import React from 'react'
import { DocumentCheckIcon, FolderOpenIcon } from '@heroicons/react/20/solid'
import toReadableFileSize from '../utils/toReadableFileSize.js';
const InputFile = ({ label = 'Select, drop or browse file' }) => {
  const [file, setFile] = React.useState();
  console.log(file)
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
          setFile(files[0]);

        }}
        className="group flex justify-center drop-shadow-lg items-center w-full h-32 px-4 transition bg-slate-50 dark:bg-slate-800 dark:text-slate-300  border-2 border-slate-300 dark:border-slate-900 border-dashed rounded-md appearance-none cursor-pointer hover:border-green-600 focus:outline-none space-x-2"
      >
        {
          file ? (
            <>
              <DocumentCheckIcon className='w-10 h-10 text-green-600 drop-shadow-lg' />
              <span className="font-normal">
                {file.name} {toReadableFileSize(file.size, true)}
              </span>
            </>
          ) : (
            <>
              <FolderOpenIcon className='w-10 h-10 group-hover:text-green-600 drop-shadow-lg' />
              <span className="font-normal">
                {label}
              </span>
            </>
          )
        }

        <input
          onChange={e => {
            const files = e.target.files;
            setFile(Array.from(files)[0]);
          }}
          max={1}
          accept=".bil,.hdr"
          type="file"
          name="file_upload"
          className="hidden"
        />
      </label>
    </div >


  )
}

export default InputFile