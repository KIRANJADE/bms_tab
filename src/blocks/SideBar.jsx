import React from 'react';
import { List, ListItemButton, ListItemText } from "@mui/material";

const pages = [
  { id: "tab1", label: "Page 1", path: "/dashboard" },
  { id: "tab2", label: "Page 2", path: "/user" },
  { id: "tab3", label: "Page 3", path: "/chantha" },
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
