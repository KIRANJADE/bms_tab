import { List, ListItemButton, ListItemText, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const pages = [
  { id: "tab1", label: "Users", path: "/dashboard" },
  { id: "tab2", label: "Members", path: "/user" },
  { id: "tab3", label: "Chantha", path: "/chantha" },
  { id: "tab4", label: "Events", path: "/events" },
];

const SideBar = ({ addTab, isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Menu Icon to Open Sidebar */}
      <IconButton
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 2000,
          display: isOpen ? "none" : "block", // Hide when sidebar is open
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar */}
      <Box
        sx={{
          width: isOpen ? 200 : 0, // Conditional width
          transition: "width 0.3s ease-in-out",
          backgroundColor: "#ffffff",
          color: "#000",
          height: "100vh",
          overflowX: "hidden", // Prevent horizontal scrolling
          position: "fixed",
          top: 0,
          left: 0,
          boxShadow: isOpen ? "2px 0 5px rgba(0,0,0,0.2)" : "none",
          zIndex: 1500,
        }}
      >
        {/* Menu Icon to Close Sidebar */}
        <IconButton
          onClick={toggleSidebar}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2000,
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* List of Menu Items */}
        <List sx={{ padding: "10px" }}>
          {pages.map((page) => (
            <ListItemButton
              key={page.id}
              sx={{ color: "black", "&:hover": { backgroundColor: "#1976d2", color: "#fff", borderRadius: '10px' } }}
              onClick={() => addTab(page.id, page.label, page.path)} // Do not toggle sidebar here
            >
              <ListItemText primary={page.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </>
  );
};

export default SideBar;
