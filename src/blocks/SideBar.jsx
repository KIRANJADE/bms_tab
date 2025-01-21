import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const pages = [
  {
    id: "tab1",
    label: "Administrators",
    path: "/admin",
    icon: <SupervisorAccountIcon />,
  },
  { id: "tab2", label: "Users", path: "/dashboard", icon: <PersonIcon /> },
  { id: "tab3", label: "Committee Meeting", path: "/user", icon: <HomeIcon /> },
  {
    id: "tab4",
    label: "Chantha",
    path: "/chantha",
    icon: <PaidOutlinedIcon />,
  },
  { id: "tab5", label: "Events", path: "/events", icon: <EventIcon /> },
];

const SideBar = ({ addTab }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const drawerContent = (
    <>
      <div>
        <Divider />
        <List>
          {pages.map((page) => (
            <ListItemButton
              key={page.id}
              onClick={() => {
                addTab(page.id, page.label, page.path);
                if (isSmallScreen) setIsDrawerOpen(false);
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "#DEEFFF",
                },
              }}
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.label} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
      </div>

      {/* Footer Section */}
      <div>
        <List>
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
            }}
          >
            <ListItemIcon>
              <LogoutIcon style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </div>
    </>
  );

  return (
    <>
      {/* Menu Icon for Small Screens */}
      {isSmallScreen && (
        <IconButton
          color="primary"
          onClick={toggleDrawer}
          style={{ position: "fixed", top: 10, left: 10 }}
        >
          <MenuIcon />
        </IconButton>
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
          padding: 16,
          transition: "margin-left 0.3s",
        }}
      >
        {/* Main Content Goes Here */}
      </div>
    </>
  );
};

export default SideBar;
