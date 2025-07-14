import React, { useCallback, useEffect } from 'react'
import { DocumentCheckIcon, FolderOpenIcon } from '@heroicons/react/20/solid'
import toReadableFileSize from '../utils/toReadableFileSize.js';
const InputFile = ({ label = 'Select, drop or browse file' , max, onChangeFile = ()=>{}, accept}) => {
  const [file, setFile] = React.useState();
  const onChangeFileCallback = useCallback(onChangeFile, [onChangeFile])
  useEffect(() => {
    file && onChangeFileCallback(file)
  }, [file])
  return (

    <label
        onDragOver={(e) => {
          e.preventDefault();

        }}
        onDrop={(e) => {
          e.preventDefault();

          const files = e.dataTransfer.files;
          console.log('files ',files)
          setFile(Array.from(files).slice(0,2));

        }}
        className="group flex justify-center drop-shadow-lg items-center w-full h-full px-4 transition bg-slate-50 dark:bg-slate-800 dark:text-slate-300  border-2 border-slate-300 dark:border-slate-900 border-dashed rounded-md appearance-none cursor-pointer hover:border-green-600 focus:outline-none space-x-2"
      >
        {
          file ? (
            <>
              <DocumentCheckIcon className='w-10 h-10 text-green-600 drop-shadow-lg' />
              <div className='w-fit flex flex-col space-y-1'>
                {
                  file.map((f, i) => (
                    <div key={i} className='flex flex-row justify-between items-center space-x-2'>
                      <span className='font-normal'>{f.name}</span>
                      <span className='font-light'>{toReadableFileSize(f.size, true)}</span>
                    </div>
                  ))
                }
                
              </div>
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
            if(files.length>max) return;
            setFile(Array.from(files));
          }}
          multiple
          max={max}
          accept={accept}
          type="file"
          name="file_upload"
          className="hidden"
        />
      </label>


  )
}

export default InputFile