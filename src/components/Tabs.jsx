import React, { useState } from 'react'

const Tabs = () => {
  const innerTab = {
    id: 0,
    title: '',
  }
  const defaultTabs = [
    {
      id: 1,
      title: 'ultra large tab name',
    },
    {
      id: 2,
      title: 'Tab 2',
    },
    
  ]
  const [tabs, setTabs] = useState(defaultTabs)
  const [activeTab, setActiveTab] = useState(1)
  const activeStyle =
    "flex justify-center items-center w-fit h-full cursor-pointer border-x border-t border-slate-200 bg-slate-50 not-draggable-element hover:outline -outline-offset-1 outline-slate-200 dark:outline-slate-800 active:bg-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:active:bg-slate-900 max-h-9"
  const inactiveStyle =
    "flex justify-center items-center w-fit h-full cursor-pointer border-b border-slate-200 bg-slate-100 not-draggable-element hover:bg-slate-200 hover:border hover:border-slate-300 dark:hover:border-slate-700 active:bg-slate-300 dark:bg-slate-700 dark:border-slate-800 dark:hover:bg-slate-600 dark:active:bg-slate-800 max-h-9"
  return (
    <div className='px-20 draggable-element'>
      <div
        className="relative flex flex-row h-9 max-h-9 bg-slate-200 dark:bg-slate-700 text-sm font-light text-slate-600 dark:text-slate-200 overflow-x-scroll overflow-y-hidden"w
      >
        {
          [
            (
              //add tab
              <div className={'min-w-9 text-3xl font-extralight max-h-9 sticky left-0 border-r-0' + ' ' + activeStyle}>
                +
              </div>
            ),
            tabs.map(tab => (
              <div
                key={tab.id}
                className={
                  (activeTab === tab.id ? activeStyle : inactiveStyle) + ' ' + 'min-w-32 px-2 text-nowrap overflow-clip'
                }
              >
                {tab.title}
              </div>
            )),

          ]

        }

      </div>
    </div>

  )
}

export default Tabs