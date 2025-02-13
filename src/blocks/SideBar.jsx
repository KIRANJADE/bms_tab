import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
  IconButton,
  useMediaQuery,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { useNavigate } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CloseIcon from "@mui/icons-material/Close";
import {
  getAllNotifications,
  approveRejectNotifications,
} from "../state/redux/userApi";
import { notify } from "../state/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
const pages = [
  {
    id: "tab1",
    label: "Dashboard",
    path: "/home",
    icon: <DashboardCustomizeIcon />,
  },
  {
    id: "tab2",
    label: "Administrators",
    path: "/admin",
    icon: <SupervisorAccountIcon />,
  },
  { id: "tab3", label: "Users", path: "/dashboard", icon: <PersonIcon /> },
  { id: "tab4", label: "Committee Meeting", path: "/user", icon: <HomeIcon /> },
  {
    id: "tab5",
    label: "Chantha",
    path: "/chantha",
    icon: <PaidOutlinedIcon />,
  },
  { id: "tab6", label: "Events", path: "/events", icon: <EventIcon /> },
];

const notifications = [
  { id: 1, message: "New friend request from John" },
  { id: 2, message: "Your order has been shipped" },
  { id: 3, message: "Reminder: Meeting at 3 PM" },
];

const SideBar = ({ addTab }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null); // Track active tab
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isNotifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const notification = useSelector(
    (state) => state.auth?.notificationData || []
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  console.log(notification?.notificationsDetails, "notificationnotification");

  useEffect(() => {
    fetchNotify();
  }, [localStorage.getItem("memberId")]);

  const fetchNotify = async () => {
    try {
      let payload = {
        memberId: localStorage.getItem("memberId"),
      };
      const response = await getAllNotifications(payload);

      if (response.status) {
        dispatch(notify(response));
      }
    } catch (error) {
      // setError("Failed to fetch user data");
    } finally {
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleAction = async (notificationId, actionType) => {
    let payload = {
      isRead: true,
      status: actionType,
      remark: actionType === "approve" ? "approved" : "rejected",
    };
    try {
      await approveRejectNotifications(notificationId, payload);
      fetchNotify();
      toast.success(`Notification ${actionType}d successfully!`);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error handling action:", error);
    }
  };

  const drawerContent = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Main Menu Section */}
      <div>
        <Divider />
        <List>
          {pages.map((page) => (
            <ListItemButton
              key={page.id}
              onClick={() => {
                setActiveTab(page.id);
                addTab(page.id, page.label, page.path);
                if (isSmallScreen) setIsDrawerOpen(false);
              }}
              sx={{
                backgroundColor: activeTab === page.id ? "#DEEFFF" : "inherit",
                borderRadius: activeTab === page.id ? "10px" : "0",
                "&:hover": {
                  backgroundColor: "#DEEFFF",
                  borderRadius: "10px",
                },
                margin: "4px 8px", // Add margin for better spacing
              }}
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.label} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
      </div>

      {/* Footer Section (Profile and Logout) */}
      <div style={{ marginTop: "auto" }}>
        <List>
          <ListItemButton
            onClick={() => {
              setNotifDrawerOpen(true);
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderRadius: "10px",
              },
              margin: "4px 8px",
            }}
          >
            <ListItemIcon>
              <NotificationsActiveIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItemButton>

          <Drawer
            anchor="right"
            open={isNotifDrawerOpen}
            onClose={() => setNotifDrawerOpen(false)}
          >
       <ToastContainer position="top-right" autoClose={3000} />

            <List sx={{ width: 300 }}>
              <ListItem>
                <ListItemText primary="Notifications" />
                <IconButton onClick={() => setNotifDrawerOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </ListItem>

              {notification && notification?.notificationsDetails?.length > 0 ? (
                notification?.notificationsDetails.map((notification) => (
                  <ListItem
                    key={notification.id}
                    sx={{ padding: 1, marginBottom: 2 }}
                  >
                    {notification.message && (
                      <Card sx={{ width: "100%" }}>
                        <CardContent sx={{ padding: "16px" }}>
                          <Typography variant="h6" sx={{ marginBottom: 1 }}>
                            {notification.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginBottom: 2 }}
                          >
                            {notification.message}
                          </Typography>
                          {notification?.type === "approve" && (
                            <Box display="flex" mt={1}>
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() =>
                                  handleAction(notification._id, "approve")
                                }
                                sx={{ marginRight: 1 }}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() =>
                                  handleAction(notification._id, "reject")
                                }
                                size="small"
                              >
                                Reject
                              </Button>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No new notifications" />
                </ListItem>
              )}
            </List>
          </Drawer>

          <ListItemButton
            onClick={() => {
              navigate("/profile");
              if (isSmallScreen) setIsDrawerOpen(false);
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderRadius: "10px",
              },
              margin: "4px 8px",
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              color: "red",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderRadius: "10px",
              },
              margin: "4px 8px",
            }}
          >
            <ListItemIcon>
              <LogoutIcon style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </div>
    </div>
  );

  return (
    <>
      {/* Menu Icon & Logo for Small Screens */}
      {isSmallScreen && !isDrawerOpen && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 1300,
            bgcolor: "white",
            boxShadow: 2,
            borderRadius: "8px",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          {/* Toggle Drawer Button */}
          <Box sx={{ mr: 1 }}>LOGO</Box>
          <IconButton color="primary" onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>

          {/* Logo (Shown only in mobile view next to menu icon) */}
        </Box>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={isSmallScreen ? isDrawerOpen : true}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
          },
        }}
      >
        <div style={{ padding: 16 }}>LOGO</div>
        {drawerContent}
      </Drawer>

      {/* Main Content Adjust */}
      <div
        style={{
          marginLeft: isSmallScreen ? 0 : 250,
          padding: 0,
          transition: "margin-left 0.3s",
        }}
      >
        {/* Main Content Goes Here */}
      </div>
    </>
  );
};

export default SideBar;
