import React, { useState, useEffect } from "react";
import SideBar from "../blocks/SideBar";
import TabsPanel from "../blocks/TabsPanel"; 
import Dashboard from "../pages/dashboard/dashboard";
import Admin from "../pages/administrator";
import User from "../pages/user/user";
import Chantha from "../pages/chantha/chantha";
import Events from "../pages/events/index";
import "../assets/css/common.css";
import { userList } from "../state/redux/userApi";
import { useDispatch } from "react-redux";
import { userListData } from "../state/redux/authSlice";

const DashboardLayout = () => {
  const [activeTabs, setActiveTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1"); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const dispatch = useDispatch();

  const fetchUserList = async () => {
    try {
      const response = await userList();
      if (response.status) {
        dispatch(userListData(response.data));
      }
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch user data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const tabComponents = {
    tab1: <Dashboard />,
    tab2: <Admin />,
    tab3: <User />,
    tab4: <Chantha />,
    tab5: <Events />, 
  };

  const addTab = (tabId, label, path) => {
    if (!activeTabs.find((tab) => tab.id === tabId)) {
      setActiveTabs((prevTabs) => [...prevTabs, { id: tabId, label }]);
    }
    setActiveTab(tabId);
  };

  const removeTab = (tabId) => {
    setActiveTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
    if (activeTab === tabId && activeTabs.length > 1) {
      const nextTab = activeTabs.find((tab) => tab.id !== tabId);
      setActiveTab(nextTab?.id || "tab1");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SideBar
        addTab={addTab}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div
        style={{
          flex: 1,
          marginLeft: isSidebarOpen ? 250 : 50,
          transition: "margin-left 0.3s ease-in-out",
          overflow: "hidden",
        }}
      >
        <TabsPanel
          activeTabs={activeTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          removeTab={removeTab}
        />

        <div style={{ padding: "16px" }}>
          {tabComponents[activeTab] || <Dashboard />}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
