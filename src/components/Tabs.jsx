import React, { useState } from 'react'

const Tabs = () => {
  const innerTab = {
    id: 0,
    title: '',
  }
  const defaultTabs = [
    {
      id: 1,
      title: 'Tab 1',
    },
    {
      id: 2,
      title: 'Tab 2',
    }
  ]
  const [tabs, setTabs] = useState(defaultTabs)
  const [activeTab, setActiveTab] = useState(1)
  const activeStyle = "flex justify-center items-center w-fit h-full cursor-pointer border-x border-t border-slate-200 bg-slate-50 not-draggable-element hover:outline -outline-offset-1 outline-slate-200 active:bg-slate-100"
  const inactiveStyle = "flex justify-center items-center w-fit h-full cursor-pointer border-b border-slate-200 bg-slate-100 not-draggable-element hover:bg-slate-200   active:bg-slate-300"
  return (
    <div
      id="draggable-element"
      className="flex flex-row h-9 w-full  bg-slate-200 text-md font-light text-slate-600 px-20"
    >
      {
        [
          tabs.map(tab => (
            <div
              key={tab.id}
              className={
                (activeTab === tab.id ? activeStyle : inactiveStyle) + ' ' + 'min-w-32 '
              }
              name="not-draggable"
            >
              {tab.title}
            </div>
          )),
          (
            //add tab
            <div className={'min-w-9 text-3xl font-extralight'+' '+activeStyle}>
              +
            </div>
          )
        ]

      }

    </div>
  )
}

export default Tabs