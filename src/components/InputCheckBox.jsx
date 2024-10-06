import { CheckIcon } from '@heroicons/react/20/solid'
import React, { useId } from 'react'

const InputCheckBox = ({ className, children, id, name, value, onChange }) => {
  const defaultId = useId()
  const componentId = id ?? defaultId
  return (
    <label className={'flex justify-start items-center space-x-1 text-slate-700 font-light hover:bg-slate-100 rounded-md ' + ' ' + className}>
      <div className='flex rounded-lg '>
        <input
          className='relative peer shrink-0 appearance-none w-5 h-5 text-slate-200 rounded-md bg-slate-100 checked:bg-green-600 checked:border-emerald-600 border border-slate-400 drop-shadow-md focus:ring-1 ring-green-500'
          type="checkbox"
          id={componentId}
          name={name}
          value={value}
          onChange={onChange}
        />
        <CheckIcon
          className="
          absolute 
          w-5 h-5 p-0.5
          hidden peer-checked:block
          text-white
          pointer-events-none
        "
        />
      </div>
      <p >{children}</p>

    </label>
  )
}

export default InputCheckBox