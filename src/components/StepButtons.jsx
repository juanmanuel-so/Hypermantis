import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import React from 'react'

const StepButtons = ({children}) => {
  const buttonClassname='bg-slate-50 border-slate-400 hover:bg-slate-100 border text-green-700 dark:bg-slate-800 dark:border-slate-700 dark:text-green-200 dark:hover:bg-slate-950 font-bold p-1 rounded-md'
  return (
    <div className='flex flex-row justify-stretch items-center space-x-2'>
      <p className=''>{children}</p>
      <div className='flex flex-row justify-center items-center w-fit space-x-1'>
        <button className={buttonClassname}>
          <MinusIcon className='w-6 h-6'/>
        </button>
        <button className={buttonClassname}>
          <PlusIcon className='w-6 h-6'/>
        </button>
      </div>
    </div>
  )
}

export default StepButtons