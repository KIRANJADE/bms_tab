import React, { useState, useEffect } from "react";
import SideBar from "../blocks/SideBar";
import TabsPanel from "../blocks/TabsPanel";
import Dashboard from "../pages/dashboard/dashboard";
import Admin from "../pages/administrator";
import User from "../pages/committeeMeeting/committee";
import Chantha from "../pages/chantha/chantha";
import Events from "../pages/events/index";
import Death from "../pages/death/index";
import "../assets/css/common.css";
import { userList, CommitteeList, getAllEvents, getAllDeath, getMemberId } from "../state/redux/userApi";
import { useDispatch } from "react-redux";
import { userListData, committeeListData, eventsList, death, memberData } from "../state/redux/authSlice";
import { Pagination, Stack } from "@mui/material";
import Home from "../pages/homePage";
import { useMediaQuery } from "@mui/material";

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    JSON.parse(localStorage.getItem("isSidebarOpen")) ?? true
  );
  
  const [activeTabs, setActiveTabs] = useState(() => {
    const storedTabs = localStorage.getItem("activeTabs");
    return storedTabs ? JSON.parse(storedTabs) : [{ id: "tab1", label: "Dashboard" }];
  });
  
  const [activeTab, setActiveTab] = useState(() => {
    const storedTab = JSON.parse(localStorage.getItem("activeTab"));
    return storedTab || "tab1";
  });
  
  const isSmallScreen = window.innerWidth <= 768;
  
  useEffect(() => {
    localStorage.setItem("isSidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);
  
  useEffect(() => {
    localStorage.setItem("activeTab", JSON.stringify(activeTab));
  }, [activeTab]);
  
  useEffect(() => {
    localStorage.setItem("activeTabs", JSON.stringify(activeTabs));
  }, [activeTabs]);
  
  useEffect(() => {
    const storedTab = JSON.parse(localStorage.getItem("activeTab"));
    if (storedTab && activeTabs.some((tab) => tab.id === storedTab)) {
      setActiveTab(storedTab);
    }
  }, [activeTabs]);
  
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  
  const addTab = (tabId, label) => {
    setActiveTabs((prevTabs) => {
      const updatedTabs = prevTabs.find((tab) => tab.id === tabId)
        ? prevTabs
        : [...prevTabs, { id: tabId, label }];
      localStorage.setItem("activeTabs", JSON.stringify(updatedTabs)); // Persist tabs immediately
      return updatedTabs;
    });
    setActiveTab(tabId);
  };
  
  const removeTab = (tabId) => {
    setActiveTabs((prevTabs) => {
      const updatedTabs = prevTabs.filter((tab) => tab.id !== tabId);
      localStorage.setItem("activeTabs", JSON.stringify(updatedTabs)); // Persist tabs immediately
      return updatedTabs;
    });
  
    if (activeTab === tabId) {
      setActiveTab(activeTabs.length > 1 ? activeTabs[0].id : "tab1");
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

  const fetchCommitteeList = async (payload) => {
    setLoading(true);
    try {
      const response = await CommitteeList(payload);

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

  const fetchDeathList = async (payload) => {
    // setLoading(true);

    try {
      const response = await getAllDeath(payload);

      if (response.status) {
        dispatch(death(response?.deathdetails));
        // setTotalPages(response.totalPages);
      }
    } catch (error) {
      setError("Failed to fetch user data");
    } finally {
      // setLoading(false);
    }
  };

  const fetchMemberList = async (payload) => {
    // setLoading(true);

    try {
      const response = await getMemberId(payload);

      if (response.status) {
        dispatch(memberData(response?.userDetails));
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
    let deathPayload = {
      page: 1,
      limit: 12,
      status: "active"
    }
    fetchUserList();
    fetchCommitteeList();
    fetchEventsList(payload)
    fetchDeathList(deathPayload);
    fetchMemberList()
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
    tab7: <Death />,

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
