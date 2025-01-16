/* eslint-disable react/prop-types */
import { List, ListItemButton, ListItemText } from "@mui/material";

const pages = [
  { id: "tab1", label: "Users", path: "/dashboard" },
  { id: "tab2", label: "Members", path: "/user" },
  { id: "tab3", label: "Chantha", path: "/chantha" },
  { id: "tab3", label: "Events", path: "/events" },

];

const SideBar = ({ addTab }) => {
  return (
    <List
      sx={{
        width: 200,
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      {pages.map((page) => (
        <ListItemButton
          key={page.id}
          sx={{ color: "white", "&:hover": { backgroundColor: "#444" } }}
          onClick={() => addTab(page.id, page.label, page.path)}
        >
          <ListItemText primary={page.label} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default SideBar;
