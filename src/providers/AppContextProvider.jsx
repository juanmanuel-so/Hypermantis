import React from 'react'
import AppContext from '../contexts/AppContext.jsx'

const AppContextProvider = ({children, value}) => {

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider