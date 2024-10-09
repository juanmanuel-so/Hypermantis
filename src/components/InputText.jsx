import React from 'react'

const InputText = ({ className, children, placeholder}) => {
  return (
    <label className={'w-full px-1 py-0.5 ' + ' ' + className}>
      <p className=''>
        {children}
      </p>
      <input
        placeholder={placeholder}
        className='w-full outline-green-600 border border-slate-300 focus:outline-0 focus:ring-1 ring-green-600 rounded-md px-1.5 py-1 font-light text-sm dark:bg-slate-800 dark:border-slate-700 drop-shadow-md'
      />
    </label>
  )
}

export default InputText