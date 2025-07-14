import { useEffect, useState } from "react";

const initialTabs = [
  {id:1, title:'First tab'},
]

const useTabs = ({ initialTabIndex } = {}) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(initialTabIndex ?? 0);
  const storedTabs = JSON.parse(localStorage.getItem('tabs'));

  const [tabs, setTabs] = useState(storedTabs ?? initialTabs);
  console.log('tabs', tabs);
  const tabsToJson = JSON.stringify(tabs);
  useEffect(() => { localStorage.setItem('tabs', tabsToJson) }, [tabsToJson]);

  const addTab = (title) => {
    setTabs([...tabs, { title: title ?? `Tab ${tabs.length + 1}` }]);
  };

  const removeTab = (index) => {
    if (tabs.length === 1) return;
    if (index === currentTabIndex && index === tabs.length - 1) {
      setCurrentTabIndex(index - 1);
    }
    setTabs(tabs.filter((_, i) => i !== index));
  };

  const changeTabTitle = (index, newTitle) => {
    setTabs(tabs.map((tab, i) => i === index ? { ...tab, title: newTitle } : tab));
  };

  const currentTab = tabs[currentTabIndex];
  return { tabs, currentTab, currentTabIndex, setCurrentTabIndex, addTab, removeTab, changeTabTitle };
};

export default useTabs;