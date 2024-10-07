import React, { useEffect } from "react";
import Home from "./views/Home.jsx";
import Tabs from "./components/Tabs.jsx";
export default function App() {
  const storagedTheme = localStorage.getItem('theme')
  if(!storagedTheme) localStorage.setItem('theme', 'light')
  const [theme, setTheme] = React.useState(storagedTheme??"light");
  window.electronAPI.onUpdateTheme(
    (event, newTheme) => setTheme(newTheme)
  )
  useEffect(
    ()=>{
      localStorage.setItem('theme', theme)
    }
  ,[theme])
  return (
    <div className={"min-h-screen max-h-full bg-slate-50 dark:bg-slate-900 text-slate-900 font-myfont"+' '+(theme==='light'?'':'dark')}>
      <Tabs/>
      <Home className="font-bold text-red-600 "/>
    </div>
  );
}