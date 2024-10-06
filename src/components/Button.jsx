import React from 'react'

const Button = ({ className, children = '', onClick, style="primary"}) => {
  let defaultClassName
  if(style === "primary")
    defaultClassName = 'bg-green-600 border border-emerald-600 rounded-md px-2 py-1.5 text-slate-50 text-center align-middle hover:bg-green-600 hover:outline active:outline-none outline-emerald-400 active:bg-green-700 active:text-slate-300'
  else if(style === "secondary")
    defaultClassName = 'bg-slate-50 border border-emerald-600 rounded-md px-2 py-1.5 text-green-800 text-center align-middle hover:bg-slate-100 hover:outline active:outline-none outline-green-500 active:bg-slate-200 active:text-green-900'
  else if(style === "danger")
    defaultClassName = 'bg-rose-600 border border-red-600 rounded-md px-2 py-1.5 text-slate-50 text-center align-middle hover:bg-rose-600 hover:outline active:outline-none outline-red-500 active:bg-rose-700 active:text-slate-300'
  if(style)
  return (
    <button
      onClick={onClick}
      className={defaultClassName + ' drop-shadow-lg ' + className}
    >
      {children}
    </button>
  )
}

export default Button