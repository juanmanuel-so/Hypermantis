import { SquaresPlusIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'

const Tabs = ({ tabs, onAddTab, onRemoveTab, onSelectTab, currentTabIndex, currentTab }) => {
  const activeStyle =
    "flex justify-center items-center w-fit h-full cursor-pointer border-x border-t-4 border-slate-200 border-t-green-600 dark:border-t-green-700 bg-slate-50 not-draggable-element hover:outline -outline-offset-1 outline-slate-200 dark:outline-slate-800 active:bg-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:active:bg-slate-900 max-h-9 font-normal"
  const inactiveStyle =
    "flex justify-center items-center w-fit h-full cursor-pointer border-b border-slate-200 bg-slate-100 not-draggable-element hover:bg-slate-200 hover:border hover:border-slate-300 dark:hover:border-slate-800 active:bg-slate-300 dark:bg-slate-950 dark:border-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-800 max-h-9 text-slate-600 dark:text-slate-400 hover:dark:text-slate-200"

  const [isHoveringWhiteSpace, setIsHoveringWhiteSpace] = useState(false)
  const onMouseOver = () => setIsHoveringWhiteSpace(!isHoveringWhiteSpace)
  window.api.contextMenu.onReceive('close-tab',
    args=>{
      console.log('argsitops',args)
      onRemoveTab(parseInt(args.attributes.index))
      
    }
  )
  return (
    <div
      className={"flex h-9 max-h-9 bg-slate-200 dark:bg-slate-800 text-sm font-light text-slate-800 dark:text-slate-200  "+' '+(isHoveringWhiteSpace?'flex-row-reverse':'flex-row')}
    >
      <div onMouseOver={onMouseOver} className={'z-50 max-w-20 min-w-20 draggable-element'}>
      </div>
      <div
        className="z-40  w-full overflow-x-scroll draggable-element flex flex-row h-9 max-h-9 bg-slate-200 dark:bg-slate-800 text-sm font-light text-slate-800 dark:text-slate-200 remove-scrollbar"
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
            tabs.map((tab,index) => (
              <button
              
                cm-template="tab"
                cm-payload-index={index}
                onClick={() => onSelectTab(index)}
                key={index}
                className={
                  (currentTabIndex === index ? activeStyle : inactiveStyle) + ' ' + 'min-w-32 px-2 text-nowrap overflow-clip select-none'
                }
              >
                {tab.title}
              </button>
            )),

          ]

        }
      </div>
      <div className={'z-50 max-w-20 min-w-20 draggable-element'}>
      </div>
    </div>


  )
}

export default Tabs