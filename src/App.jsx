import React, { useEffect } from "react";
import Home from "./views/Home.jsx";
import Tabs from "./components/Tabs.jsx";
import useTabs from "./hooks/useTabs.js";
export default function App() {
  const storedTheme = localStorage.getItem('theme')
  if(!storedTheme) localStorage.setItem('theme', 'light')
  const [theme, setTheme] = React.useState(storedTheme??"light");
  window.electronAPI.onUpdateTheme(
    (event, newTheme) => setTheme(newTheme)
  )
  useEffect( ()=>{ localStorage.setItem('theme', theme) },[theme])
  const {tabs, currentTab, currentTabId, setCurrentTabId, addTab, removeTab}  =useTabs()
  return (
    <div className={"relative w-full h-full bg-slate-50 dark:bg-slate-900 text-slate-900 font-myfont  flex flex-col overflow-hidden"+' '+(theme==='light'?'':'dark')}>

        <Tabs
        onSelectTab={setCurrentTabId }
        onAddTab={addTab}
        onRemoveTab={removeTab}
        currentTab={currentTab}
        tabs={tabs}
      />

      <Home currentTabInformation={currentTab} className="font-bold "/>
    </div>
  );
}