import React from "react";
import Home from "./views/Home.jsx";
export default function App() {
  const [theme, setTheme] = React.useState("light");
  window.electronAPI.onUpdateTheme(
    (event, newTheme) => !console.log(theme)&&setTheme(newTheme)
  )
  return (
    <div className={"min-h-screen max-h-full bg-slate-50 dark:bg-slate-900 text-slate-900 font-myfont"+' '+(theme==='light'?'':'dark')}>
      <Home className="font-bold text-red-600"/>
    </div>
  );
}