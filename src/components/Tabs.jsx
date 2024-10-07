import { SquaresPlusIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'

const Tabs = ({ tabs, onAddTab, onRemoveTab, onSelectTab, currentTab }) => {
  const activeTab = currentTab.id
  const activeStyle =
    "flex justify-center items-center w-fit h-full cursor-pointer border-x border-t border-slate-200 bg-slate-50 not-draggable-element hover:outline -outline-offset-1 outline-slate-200 dark:outline-slate-800 active:bg-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:active:bg-slate-900 max-h-9 font-normal"
  const inactiveStyle =
    "flex justify-center items-center w-fit h-full cursor-pointer border-b border-slate-200 bg-slate-100 not-draggable-element hover:bg-slate-200 hover:border hover:border-slate-300 dark:hover:border-slate-800 active:bg-slate-300 dark:bg-slate-950 dark:border-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-800 max-h-9 text-slate-600 dark:text-slate-400 hover:dark:text-slate-200"
  return (
    <div
      className="draggable-element relative flex flex-row h-9 max-h-9 bg-slate-200 dark:bg-slate-800 text-sm font-light text-slate-800 dark:text-slate-200 overflow-x-auto "
    >
      <div className={'max-w-20 min-w-20 draggable-element'}>
      </div>
      <div 
        className="w-full overflow-x-scroll draggable-element relative flex flex-row h-9 max-h-9 bg-slate-200 dark:bg-slate-800 text-sm font-light text-slate-800 dark:text-slate-200 "
      >
        {
          [
            (
              //add tab
              <button
                onClick={() => { onAddTab() }}
                key={-1}
                className={'min-w-9 text-3xl font-extralight max-h-9 sticky left-0 border-t border-x-0 ' + ' ' + activeStyle}
              >
                <SquaresPlusIcon className='w-6 h-6 text-slate-600 rounded-lg bg-slate-100 p-0.5 dark:bg-slate-800 dark:text-slate-500' />
              </button>
            ),
            tabs.map(tab => (
              <button
                onClick={() => onSelectTab(tab.id)}
                key={tab.id}
                className={
                  (activeTab === tab.id ? activeStyle : inactiveStyle) + ' ' + 'min-w-32 px-2 text-nowrap overflow-clip'
                }
              >
                {tab.title}
              </button>
            )),

          ]

        }
      </div>
      <div className={'max-w-20 min-w-20 draggable-element'}>
      </div>
    </div>


  )
}

export default Tabs