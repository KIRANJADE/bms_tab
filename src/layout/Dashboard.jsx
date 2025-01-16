import React, { useState } from "react";
import SideBar from "../blocks/SideBar";
import TabsPanel from "../blocks/TabsPanel";
import Dashboard from "../pages/dashboard/dashboard";
import User from "../pages/user/user";
import Chantha from "../pages/chantha/chantha";
import "../assets/css/common.css";

const DashboardLayout = () => {
  const [activeTabs, setActiveTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  const tabComponents = {
    tab1: <Dashboard />,
    tab2: <User />,
    tab3: <Chantha />,
  };

  const addTab = (tabId, label) => {
    if (!activeTabs.find((tab) => tab.id === tabId)) {
      setActiveTabs((prevTabs) => [...prevTabs, { id: tabId, label }]);
    }
    setActiveTab(tabId);
  };

  const removeTab = (tabId) => {
    setActiveTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
    if (activeTab === tabId && activeTabs.length > 1) {
      const nextTab = activeTabs.find((tab) => tab.id !== tabId);
      setActiveTab(nextTab?.id || null);
    }
  };

  return (
    <div className="parentContainer" style={{ display: "flex", height: "100vh" }}>
      <SideBar addTab={addTab} />
      <div className="childHeader" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TabsPanel
          activeTabs={activeTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          removeTab={removeTab}
        />
        <div className="main" style={{ background: "#EFEFEF", flex: 1, padding: "16px" }}>
          {tabComponents[activeTab] || <Dashboard />} {/* Default to Dashboard if no tab is active */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
