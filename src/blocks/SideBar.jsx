import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useNavigate } from "react-router-dom";

const pages = [
  { id: "tab1", label: "Administrators", path: "/admin", icon: <SupervisorAccountIcon /> },
  { id: "tab2", label: "Users", path: "/dashboard", icon: <PersonIcon /> },
  { id: "tab3", label: "Commitee Meeting", path: "/user", icon: <HomeIcon /> },
  { id: "tab4", label: "Chantha", path: "/chantha", icon: <PaidOutlinedIcon /> },
  { id: "tab5", label: "Events", path: "/events", icon: <EventIcon /> },
];

const SideBar = ({ addTab, isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box
      sx={{
        width: isOpen ? 250 : 50,
        transition: "width 0.3s ease-in-out",
        backgroundColor: "#ffffff",
        color: "#000",
        height: "100vh",
        overflowX: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        boxShadow: isOpen ? "none" : "none",
        zIndex: 1500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingLeft: isOpen ? "10px" : "5px",
      }}
    >
      <Box sx={{ paddingTop: "20px", display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <h2 onClick={toggleSidebar}
          sx={{ position: "fixed", top: 10, left: 10, zIndex: 2000, }} style={{cursor:"pointer"}}>Logo</h2>
        </Box>
      <Divider />

      <List sx={{  padding: "0px", textAlign: "center" }}>
        {pages.map((page) => (
          <ListItemButton
            key={page.id}
            onClick={() => addTab(page.id, page.label, page.path)}
            sx={{
              padding: "12px 20px 10px 0px",
              "&:hover": {
                backgroundColor: "#DEEFFF",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>{page.icon}</ListItemIcon>
            <ListItemText primary={page.label} sx={{ display: isOpen ? "block" : "none" }} />
          </ListItemButton>
        ))}
      </List>
      </Box>
      <Divider />

       <Box sx={{ padding: "0px", textAlign: "center" }}>
          <ListItemButton
            sx={{
              display: isOpen ? "flex" : "none",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderRadius: "10px",
              },
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Profile" />}
          </ListItemButton>

          <ListItemButton
            sx={{
              display: isOpen ? "flex" : "none",
              color: "red",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderRadius: "10px",
              },
            }}
            onClick={() => handleLogout()}
          >
            <ListItemIcon>
              <LogoutIcon style={{ color: "red" }} />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Logout" />}
          </ListItemButton>
        </Box>
    </Box>
  );
};

export default SideBar;
