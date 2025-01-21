import React from "react";
import { List, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const pages = [
  { id: "tab1", label: "Administrators", path: "/admin", icon: <SupervisorAccountIcon />, },
  { id: "tab2", label: "Users", path: "/dashboard", icon: <PersonIcon /> },
  { id: "tab3", label: "Committee Meeting", path: "/user", icon: <HomeIcon /> },
  { id: "tab4", label: "Chantha", path: "/chantha", icon: <PaidOutlinedIcon />, },
  { id: "tab5", label: "Events", path: "/events", icon: <EventIcon /> },
];

const SideBar = ({ addTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-row">
        <h4>Logo</h4>
        <IconButton
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
          color="primary"
          onClick={() => document.getElementById("offcanvasScrolling").classList.toggle("show")}
          style={{ position: "fixed", top: 10, left: 10 }}>
          <MenuIcon />
        </IconButton>
      </div>

      <div
        style={{ width: 250 }}
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            LOGO
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <Divider />
          <List>
            {pages.map((page) => (
              <ListItemButton
                key={page.id}
                onClick={() => addTab(page.id, page.label, page.path)}
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
          
          <List>
            <ListItemButton
              onClick={() => navigate("/profile")}
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
      </div>
    </>
  );
};

export default SideBar;
