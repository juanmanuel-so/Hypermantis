import { useEffect, useState } from "react";

const initialTabs = [
  {id:1, title:'First tab'},
]

const useTabs = ({initialTabId} ={}) =>{
  const [currentTabId, setCurrentTabId] = useState(initialTabId ?? 1);
  const storedTabs = JSON.parse(localStorage.getItem('tabs'));

  const [tabs, setTabs] = useState(storedTabs??initialTabs);
  console.log('tabs', tabs)
  const tabsToJson = JSON.stringify(tabs);
  useEffect( ()=>{ localStorage.setItem('tabs', tabsToJson) },[tabsToJson])
  const addTab = (title)=>{
    setTabs([...tabs, {id:tabs[tabs.length-1].id+1, title: title ?? `Tab ${tabs.length+1}`}])
  }
  const removeTab = (tabId)=>{
    setTabs(tabs.filter(tab=>tab.id!==tabId))
  }
  const changeTabTitle = (tabId, newTitle)=> setTabs(tabs.map(tab=>tab.id===tabId?{...tab, title:newTitle}:tab))
  const currentTab = tabs.find(tab=>tab.id===currentTabId);
  return {tabs, currentTab, currentTabId, setCurrentTabId, addTab, removeTab, changeTabTitle}
}
export default useTabs