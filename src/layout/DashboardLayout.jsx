import React, { useState, useEffect } from "react";
import SideBar from "../blocks/SideBar";
import TabsPanel from "../blocks/TabsPanel";
import Dashboard from "../pages/dashboard/dashboard";
import Admin from "../pages/administrator";
import User from "../pages/committeeMeeting/committee";
import Chantha from "../pages/chantha/chantha";
import Events from "../pages/events/index";
import "../assets/css/common.css";
import { userList, CommitteeList, getAllEvents } from "../state/redux/userApi";
import { useDispatch } from "react-redux";
import { userListData, committeeListData, eventsList } from "../state/redux/authSlice";
import { Pagination, Stack } from "@mui/material";
import Home from "../pages/homePage";
import { useMediaQuery } from "@mui/material";

const DashboardLayout = () => {
  // const [activeTabs, setActiveTabs] = useState([
  //   { id: "tab1", label: "Dashboard" },
  // ]);
  // const [activeTab, setActiveTab] = useState("tab1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  // const isSmallScreen = useMediaQuery("(max-width:1200px)");
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    JSON.parse(localStorage.getItem("isSidebarOpen")) ?? true
  );
  const [activeTabs, setActiveTabs] = useState(() => {
    const storedTabs = localStorage.getItem("activeTabs");
    return storedTabs ? JSON.parse(storedTabs) : [{ id: "tab1", label: "Dashboard" }];
  });
  
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "tab1";
  });
  const isSmallScreen = window.innerWidth <= 768;

 useEffect(() => {
    localStorage.setItem("isSidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  useEffect(() => {
    localStorage.setItem("activeTabs", JSON.stringify(activeTabs));
  }, [activeTabs]);

  useEffect(() => {
    localStorage.setItem("activeTab", JSON.stringify(activeTab));
  }, [activeTab]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
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

  const fetchUserList = async () => {
    setLoading(true);
    try {
      const response = await userList({
        page: 1,
        limit: 12,
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

  const fetchCommitteeList = async () => {
    setLoading(true);
    try {
      const response = await CommitteeList(page, limit, {
        status: "active",
      });

      if (response.status) {
        dispatch(committeeListData(response.userDetails));
        // setTotalPages(response.totalPages);
      }
    } catch (error) {
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };
  const fetchEventsList = async (payload) => {
    // setLoading(true);

    try {
      const response = await getAllEvents(payload);

      if (response.status) {
        dispatch(eventsList(response?.eventDetails));
        // setTotalPages(response.totalPages);
      }
    } catch (error) {
      setError("Failed to fetch user data");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    let payload = {
      page: 1,
      limit: 12,
    }
    fetchUserList();
    fetchCommitteeList();
    fetchEventsList(payload)
  }, [page, limit]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };



  const tabComponents = {
    tab1: <Home />,
    tab2: <Admin />,
    tab3: <Dashboard />,
    tab4: <User />,
    tab5: <Chantha />,
    tab6: <Events />,
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
          marginLeft: isSidebarOpen ? 0 : 50,
          transition: "margin-left 0.3s ease-in-out",
          marginTop: isSmallScreen ? "40px" : "0px",
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
