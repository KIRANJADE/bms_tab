import React from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";

const pages = [
  { id: "tab1", label: "Page 1" },
  { id: "tab2", label: "Page 2" },
  { id: "tab3", label: "Page 3" },
];

const SideMenu = ({ addTab }) => {
  return (
    <List
      sx={{
        width: 200,
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px",
      }}
    >
      {pages.map((page) => (
        <ListItemButton
          key={page.id}
          sx={{ color: "white", "&:hover": { backgroundColor: "#444" } }}
          onClick={() => addTab(page.id, page.label)}
        >
          <ListItemText primary={page.label} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default SideMenu;