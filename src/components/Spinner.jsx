import React from 'react'
import Logo from '../assets/hypermantis.svg'
const Spinner = ({className=''}) => {
  return (
    <div className={'relative flex justify-center items-center'+' '+className}>
      <Logo className='w-3/6 h-3/6' />
      <svg className='stroke-green-600 h-full w-full absolute top-0 left-0 animate-spin' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="50"
          cy="50"
          r="40"
          strokeWidth="8"
          fill="none"
          strokeDasharray="251.2"  // Perímetro del círculo
          strokeDashoffset="62.8"  // 1/4 del perímetro "borrado"
        />
      </svg>
    </div>

  )
}

export default Spinner