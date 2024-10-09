import React from 'react'
import Logo from '../assets/hypermantis.svg'
const LogoText = () => {
  return (
    <div className="flex flex-row justify-start items-center space-x-4 p-2">
      <Logo className="w-10  h-10 " />
      <h1 className="w-fit font-normal text-3xl">Hypermantis</h1>
    </div>
  )
}

export default LogoText