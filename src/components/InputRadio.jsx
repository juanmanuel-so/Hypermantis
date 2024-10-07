import { CheckIcon } from '@heroicons/react/20/solid'
import React, { useId } from 'react'

const defaultOptions = [
  { id: 'option1', name: 'option1', },
  { id: 'option2', name: 'option2', },
]

const defaultGetId = (option) => option.id
const defaultGetName = (option) => option.name
const InputRadio = ({ className, id, name, value, onChange, options = defaultOptions, getId = defaultGetId, getName = defaultGetName }) => {
  const defaultName = useId()
  const componentName = id ?? defaultName
  return (
    <div name={name}s className='flex flex-col space-y-1'>
      {options.map(option => (
        <label className={'flex flex-row justify-start items-center space-x-1 font-light hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md ' + ' ' + className}>
          <div className='flex rounded-lg '>
            <input
              className='relative peer shrink-0 appearance-none w-5 h-5 rounded-full bg-slate-100 checked:bg-green-600 checked:border-emerald-600 border border-slate-400 drop-shadow-md focus:ring-1 ring-green-500'
              type="radio"
              id={getId(option)}
              name={componentName}
              value={value}
              onChange={onChange}
            />
            <svg
              className="absolute w-5 h-5 hidden peer-checked:block pointer-events-none p-1 text-slate-100"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <p>{getName(option)}</p>
        </label>
      ))}
    </div>
  )
}

export default InputRadio