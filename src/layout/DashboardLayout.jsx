import { useEffect, useState } from "react";
import SideBar from "../blocks/SideBar";
import TabsPanel from "../blocks/TabsPanel";
import Dashboard from "../pages/dashboard/dashboard";
import User from "../pages/user/user";
import Chantha from "../pages/chantha/chantha";

import "../assets/css/common.css";
import { userList } from "../state/redux/userApi";
import { useDispatch } from "react-redux";
import { userListData } from "../state/redux/authSlice";

const DashboardLayout = () => {
  const [activeTabs, setActiveTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1"); // Default to Dashboard tab
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const dispatch = useDispatch();

  const fetchUserList = async () => {
    try {
      const response = await userList();
      console.log(response, "userList");
      if (response.status) {
        dispatch(userListData(response.data));
      }
      setLoading(false); // Stop loading after success
    } catch (error) {
      console.error("API call failed:", error);
      setError("Failed to fetch user data");
      setLoading(false); // Stop loading on error
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

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
      setActiveTab(nextTab?.id || "tab1"); // Default to Dashboard if no tabs are left
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

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
          {tabComponents[activeTab] || <Dashboard />}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
