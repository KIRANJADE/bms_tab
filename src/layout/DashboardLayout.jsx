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
import { Pagination, Stack } from "@mui/material";

const DashboardLayout = () => {
  const [activeTabs, setActiveTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8); // Limit set to 8 cards per page
  const [totalPages, setTotalPages] = useState(0);

  const dispatch = useDispatch();

  const fetchUserList = async () => {
    setLoading(true);
    try {
      const response = await userList(page, limit, {
        status: "active",
        "memberdetails.memberType": "a-class",
        "memberdetails.userType": "full",
      });

      if (response.status) {
        dispatch(userListData(response.userDetails));
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, [page, limit]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const tabComponents = {
    tab1: <Admin />,
    tab2: <Dashboard />,
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
      <div style={{
          flex: 1,
          marginLeft: isSidebarOpen ? 0 : 50,
          transition: "margin-left 0.3s ease-in-out",
        //   overflow: "auto", // Ensure only card container scrolls
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
